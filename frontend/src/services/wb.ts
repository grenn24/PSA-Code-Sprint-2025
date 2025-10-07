import createApiClient from "utilities/apiClient";
import { WBConversation, WBMessage } from "@common/types/wb";
import websocketService, { Listener } from "utilities/websocket";

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
		new Promise((resolve, reject) => {
			const listener: Listener = (message) => {
				if (message.type === "wb_stream_end") {
					websocketService.removeListener(listener);
					resolve(message.data);
				}
			};
			websocketService.addListener(listener);
			websocketService.send({
				type: "wb_user_message",
				conversationID,
				timestamp: new Date().toISOString(),
				data,
			});
		});
	}
}

const wbService = new WBService();
export default wbService;
