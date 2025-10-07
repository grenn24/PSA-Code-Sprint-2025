import createApiClient from "utilities/apiClient";
import { WBConversation, WBMessage } from "@common/types/wb";

class WBService {
	apiClient = createApiClient("/wb");

	async createConversation(data?: { content: string; timestamp: Date }) {
		const response = await this.apiClient.post<any, WBConversation>(
			"/",
			data
		);
		return response.data;
	}

	async postMessage(
		conversationID: string,
		data: {
			content: string;
			timestamp: Date;
		}
	) {
		const response = await this.apiClient.post<any, WBConversation>(
			`/${conversationID}`,
			data
		);
		return response.data;
	}
}

const wbService = new WBService();
export default wbService;
