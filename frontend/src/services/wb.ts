import createApiClient from "utilities/apiClient";
import { WBConversation, WBMessage } from "@common/types/wb";

class WBService {
	apiClient = createApiClient("/wb");

	async createConversation(message: string) {
		return this.apiClient.post<any, WBConversation>("/", { message });
	}

	async postMessage(conversationID: string, message: string) {
		return this.apiClient.post<any, WBMessage>(
			`/${conversationID}/message`,
			{ message }
		);
	}
}

const wbService = new WBService();
export default wbService;
