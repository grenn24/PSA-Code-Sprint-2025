import createApiClient from "../utilities/apiClient";
import { Chat, Message } from "@common/types/chat";

class ChatService {
	apiClient = createApiClient("/chat");

	async createChat(participantIDs: string[]) {
		const response = await this.apiClient.post<any, Chat>("", {
			participants: participantIDs,
		});
		return response.data;
	}

	async postMessage(
		chatID: string,
		{
			sender: senderID,
			content,
			type = "text",
			metadata = {},
			createdAt,
		}: {
			sender: string;
			content: string;
			type?: Message["type"];
			metadata?: Record<string, any>;
			createdAt?: Date;
		}
	) {
		const data = {
			sender: senderID,
			content,
			createdAt,
			type,
			metadata,
		};
		const response = await this.apiClient.post<Message, Message>(
			`/${chatID}/message`,
			data
		);
		return response.data;
	}

	async updateMessage(
		messageID: string,
		chatID: string,
		data: {
			content: string;
			type?: Message["type"];
			metadata?: Record<string, any>;
		}
	) {
		const response = await this.apiClient.put<any, Message>(
			`/${chatID}/message/${messageID}`,
			data
		);
		return response.data;
	}

	async markMessagesAsRead(chatID: string) {
		const response = await this.apiClient.post(`/${chatID}/read`, {});
		return response.data;
	}
}

const chatService = new ChatService();
export default chatService;
