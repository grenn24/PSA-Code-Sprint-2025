import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import websocketService from "../utilities/websocket.js";
import userService from "./user.js";
class ChatService {
    async getChatByID(chatID) {
        const chat = await Chat.findById(chatID)
            .populate("participants")
            .exec();
        if (!chat) {
            throw new HttpError("Chat not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        chat.messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return chat;
    }
    async postMessage(chatID, { sender: senderID, content, type = "text", metadata = {}, createdAt, }) {
        const sender = await User.findById(senderID);
        if (!sender) {
            throw new HttpError("Sender not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const chat = await Chat.findById(chatID);
        if (!chat) {
            throw new HttpError("Chat not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const message = {
            sender: sender._id,
            content,
            type,
            metadata,
            createdAt: createdAt || new Date(),
        };
        chat.messages.push(message);
        await chat.save();
        const newMessage = chat.messages[chat.messages.length - 1];
        const recipientID = chat.participants
            .filter((p) => !p.equals(sender._id))
            .pop()
            ?.toString();
        if (!recipientID) {
            throw new HttpError("Recipient not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        let notificationMsg = `${sender.name} sent you a message`;
        switch (type) {
            case "file":
                notificationMsg = `${sender.name} shared a file`;
                break;
            case "tip":
                notificationMsg = `${sender.name} shared a quick tip`;
                break;
            case "quiz":
                notificationMsg = `${sender.name} started a quiz`;
                break;
            case "poll":
                notificationMsg = `${sender.name} created a poll`;
                break;
            case "feedback":
                notificationMsg = `${sender.name} gave you feedback`;
                break;
            case "feedbackRequest":
                notificationMsg = `${sender.name} requested feedback`;
                break;
            case "question":
                notificationMsg = `${sender.name} asked a question`;
                break;
            case "moodUpdate":
                notificationMsg = `${sender.name} shared a mood update`;
                break;
            case "wellbeingPrompt":
                notificationMsg = `Wellbeing check-in from ${sender.name}`;
                break;
        }
        await userService.addNotification(recipientID, notificationMsg);
        websocketService.sendTo(recipientID, {
            type: "NEW_CHAT_MESSAGE",
            data: {
                chatID: chat._id,
                message: newMessage,
            },
            timestamp: new Date().toISOString(),
        });
        return newMessage;
    }
    async updateMessage(updaterID, messageID, chatID, { content, type, metadata, }) {
        const chat = await Chat.findById(chatID);
        if (!chat) {
            throw new HttpError("Chat not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const message = chat.messages.id(messageID);
        if (!message) {
            throw new HttpError("Message not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        message.content = content;
        if (type) {
            message.type = type;
        }
        message.metadata = metadata;
        await chat.save();
        const recipientID = chat.participants
            .filter((p) => !p.equals(updaterID))
            .pop()
            ?.toString();
        if (!recipientID) {
            throw new HttpError("Recipient not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        websocketService.sendTo(recipientID, {
            type: "CHAT_MESSAGE_UPDATE",
            data: {
                chatID: chat._id,
                message: chat.messages.id(messageID),
            },
            timestamp: new Date().toISOString(),
        });
        return message;
    }
    async createChat(participantIDs) {
        if (participantIDs.length !== 2) {
            throw new HttpError("Every chat must have 2 participants", "BAD_REQUEST", HttpStatusCode.BadRequest);
        }
        const users = await User.find({ _id: { $in: participantIDs } });
        if (users.length !== 2) {
            throw new HttpError("At least one of the participant IDs provided is not valid", "BAD_REQUEST", HttpStatusCode.BadRequest);
        }
        const chat = new Chat({ participants: participantIDs });
        await chat.save();
        await chat.populate("participants");
        return chat;
    }
    async markMessagesAsRead(chatID, userID) {
        const updatedChat = await Chat.findByIdAndUpdate(chatID, {
            $set: {
                "messages.$[msg].read": true,
                "messages.$[msg].readAt": new Date(),
            },
        }, {
            arrayFilters: [
                {
                    "msg.sender": { $ne: userID },
                    "msg.read": false,
                },
            ],
            new: true,
        })
            .populate("participants")
            .exec();
        if (!updatedChat) {
            throw new HttpError("Chat not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const recipient = updatedChat.participants
            .filter((p) => !p._id?.equals(userID))
            .pop();
        if (!recipient) {
            throw new HttpError("Recipient not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        websocketService.sendTo(recipient._id.toString(), {
            type: "CHAT_MESSAGE_READ",
            data: updatedChat,
            timestamp: new Date().toISOString(),
        });
        return updatedChat;
    }
    async offerVideoCall(offer, targetUserID, chatID) {
        const chat = await Chat.findById(chatID)
            .populate("participants")
            .exec();
        if (!chat) {
            throw new HttpError("Chat not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const recipient = chat.participants
            .filter((p) => p._id?.equals(targetUserID))
            .pop();
        if (!recipient) {
            throw new HttpError("Recipient not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        websocketService.sendTo(recipient._id.toString(), {
            type: "offer_video_call",
            data: offer,
            chat,
            timestamp: new Date().toISOString(),
        });
    }
    async answerVideoCall(answer, targetUserID, chatID) {
        const chat = await Chat.findById(chatID)
            .populate("participants")
            .exec();
        if (!chat) {
            throw new HttpError("Chat not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const recipient = chat.participants
            .filter((p) => p._id?.equals(targetUserID))
            .pop();
        if (!recipient) {
            throw new HttpError("Recipient not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        console.log(recipient._id.toString());
        websocketService.sendTo(recipient._id.toString(), {
            type: "answer_video_call",
            data: answer,
            chat,
            timestamp: new Date().toISOString(),
        });
    }
}
export const chatService = new ChatService();
export default chatService;
//# sourceMappingURL=chat.js.map