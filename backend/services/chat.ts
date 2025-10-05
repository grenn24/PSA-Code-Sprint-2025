import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import websocketService from "../utilities/websocket.js";
import userService from "./user.js";

class ChatService {
	async getChatByID(chatID: string) {
		const chat = await Chat.findById(chatID)
			.populate("participants")
			.exec();
		if (!chat) {
			throw new HttpError(
				"Chat not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		chat.messages.sort(
			(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
		);

		return chat;
	}

	async postMessage(
		chatID: string,
		{
			sender: senderID,
			content,
			createdAt,
		}: {
			sender: string;
			content: string;
			createdAt?: Date;
		}
	) {
		const sender = await User.findById(senderID);
		if (!sender) {
			throw new HttpError(
				"Sender not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const chat = await Chat.findById(chatID);
		if (!chat) {
			throw new HttpError(
				"Chat not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}

		chat.messages.push({ sender: sender._id, content, createdAt });
		await chat.save();
		const newMessage = chat.messages[chat.messages.length - 1];
		const recipientID = chat.participants
			.filter((p) => !p.equals(sender._id))
			.pop()
			?.toString();
		if (!recipientID) {
			throw new HttpError(
				"Recipient not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}

		await userService.addNotification(
			recipientID,
			`${sender.name} just sent you a chat message`
		);

		websocketService.sendTo(recipientID, {
			type: "CHAT_MESSAGE",
			data: {
				chatID: chat._id,
				message: newMessage,
			},
			timestamp: new Date().toISOString(),
		});

		return newMessage;
	}

	async createChat(participantIDs: string[]) {
		if (participantIDs.length !== 2) {
			throw new HttpError(
				"Every chat must have 2 participants",
				"BAD_REQUEST",
				HttpStatusCode.BadRequest
			);
		}
		const users = await User.find({ _id: { $in: participantIDs } });
		if (users.length !== 2) {
			throw new HttpError(
				"At least one of the participant IDs provided is not valid",
				"BAD_REQUEST",
				HttpStatusCode.BadRequest
			);
		}
		const chat = new Chat({ participants: participantIDs });
		await chat.save();
		await chat.populate("participants");
		return chat;
	}

	async markMessagesAsRead(chatID: string, userID: string) {
		const updatedChat = await Chat.findByIdAndUpdate(
			chatID,
			{
				$set: {
					"messages.$[msg].read": true,
					"messages.$[msg].readAt": new Date(),
				},
			},
			{
				arrayFilters: [
					{
						"msg.sender": { $ne: userID },
						"msg.read": false,
					},
				],
				new: true,
			}
		)
			.populate("participants")
			.exec();
		if (!updatedChat) {
			throw new HttpError(
				"Chat not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const recipient = updatedChat.participants
			.filter((p) => !p._id?.equals(userID))
			.pop();
		console.log(recipient, userID);
		if (!recipient) {
			throw new HttpError(
				"Recipient not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		console.log("sending ws", recipient._id);
		websocketService.sendTo(recipient._id.toString(), {
			type: "CHAT_MESSAGE_READ",
			data: updatedChat,
			timestamp: new Date().toISOString(),
		});

		return updatedChat;
	}
}

export const chatService = new ChatService();
export default chatService;
