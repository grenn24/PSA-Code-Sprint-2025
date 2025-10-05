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

	async postMessage(chatID: string, { senderID, content, createdAt }) {
		const data = {
			sender: senderID,
			content,
			createdAt,
		};
		const response = await this.apiClient.post<Message, Message>(
			`/${chatID}/message`,
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
