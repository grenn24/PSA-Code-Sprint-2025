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

	async postMessageStateless(
		data: { content: string; timestamp: Date },
		history: WBMessage[] = [],
		systemPrompt?: string
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
				type: "wb_user_message_stateless",
				timestamp: new Date().toISOString(),
				data,
				history,
				systemPrompt,
			});
		});
	}

	async trackMoodChanges(
		userID: string,
		data:
			| {
					content: string;
					timestamp: Date;
			  }
			| undefined = undefined,
		history: WBMessage[] = []
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
				type: "wb_mood_changes",
				timestamp: new Date().toISOString(),
				userID,
				data,
				history,
			});
		});
	}

	async getUsefulTips(userID: string) {
		const response = await this.apiClient.post<any, any>("/useful-tips", { userID });
		return response.data;
	}
}

const wbService = new WBService();
export default wbService;
