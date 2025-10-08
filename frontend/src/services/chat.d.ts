import { Chat, Message } from "@common/types/chat";
declare class ChatService {
    apiClient: import("../utilities/apiClient").ApiClient;
    createChat(participantIDs: string[]): Promise<Chat>;
    postMessage(chatID: string, { sender: senderID, content, type, metadata, createdAt, }: {
        sender: string;
        content: string;
        type?: Message["type"];
        metadata?: Record<string, any>;
        createdAt?: Date;
    }): Promise<Message>;
    updateMessage(messageID: string, chatID: string, data: {
        content: string;
        type?: Message["type"];
        metadata?: Record<string, any>;
    }): Promise<Message>;
    markMessagesAsRead(chatID: string): Promise<Chat>;
}
declare const chatService: ChatService;
export default chatService;
