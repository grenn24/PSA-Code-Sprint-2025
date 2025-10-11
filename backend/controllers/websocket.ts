import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
import wbService from "../services/wb.js";
import websocketService from "../utilities/websocket.js";
import chatService from "../services/chat.js";

class WebsocketController {
	async postMessage(websocket: WebSocket, message: WebsocketMessage) {
		const onDelta = (chunk: string) =>
			websocketService.sendToWS(websocket, {
				type: "wb_stream_chunk",
				data: chunk,
				timestamp: new Date().toISOString(),
				conversationID: message.conversationID,
			});
		const response = await wbService.postMessage(
			message.conversationID,
			message.data,
			onDelta
		);
		websocketService.sendToWS(websocket, {
			type: "wb_stream_end",
			data: response,
			timestamp: new Date().toISOString(),
			conversationID: message.conversationID,
		});
	}

	async postMessageStateless(
		websocket: WebSocket,
		message: WebsocketMessage
	) {
		const onDelta = (chunk: string) =>
			websocketService.sendToWS(websocket, {
				type: "wb_stream_chunk",
				data: chunk,
				timestamp: new Date().toISOString(),
				conversationID: message.conversationID,
			});
		const response = await wbService.postMessageStateless(
			message.data,
			message.history,
			onDelta,
			message.systemPrompt
		);
		websocketService.sendToWS(websocket, {
			type: "wb_stream_end",
			data: response,
			timestamp: new Date().toISOString(),
			conversationID: message.conversationID,
		});
	}

	async trackMoodChanges(websocket: WebSocket, message: WebsocketMessage) {
		const onDelta = (chunk: string) =>
			websocketService.sendToWS(websocket, {
				type: "wb_stream_chunk",
				data: chunk,
				timestamp: new Date().toISOString(),
			});
		const response = await wbService.trackMoodChanges(
			message.userID,
			message.data,
			message.history,
			onDelta
		);
		websocketService.sendToWS(websocket, {
			type: "wb_stream_end",
			data: response,
			timestamp: new Date().toISOString(),
		});
	}

	async getUnbiasedOpinion(websocket: WebSocket, message: WebsocketMessage) {
		const onDelta = (chunk: string) =>
			websocketService.sendToWS(websocket, {
				type: "wb_stream_chunk",
				data: chunk,
				timestamp: new Date().toISOString(),
			});
		const response = await wbService.getUnbiasedOpinion(
			message.data,
			onDelta
		);
		websocketService.sendToWS(websocket, {
			type: "wb_stream_end",
			data: response,
			timestamp: new Date().toISOString(),
		});
	}

	async dailyCheckIn(websocket: WebSocket, message: WebsocketMessage) {
		const onDelta = (chunk: string) =>
			websocketService.sendToWS(websocket, {
				type: "wb_stream_chunk",
				data: chunk,
				timestamp: new Date().toISOString(),
			});
		const response = await wbService.dailyCheckIn(message.data, onDelta);
		websocketService.sendToWS(websocket, {
			type: "wb_stream_end",
			data: response,
			timestamp: new Date().toISOString(),
		});
	}

	handleVideoCall(websocket: WebSocket, message: WebsocketMessage) {
		if (message.type === "offer_video_call") {
			chatService.offerVideoCall(
				message.data,
				message.targetUserID,
				message.chatID
			);
		}

		if (message.type === "answer_video_call") {
			chatService.answerVideoCall(
				message.data,
				message.targetUserID,
				message.chatID
			);
		}

		if (message.type === "reject_video_call") {
			websocketService.sendTo(message.targetUserID, {
				type: "reject_video_call",
				chatID: message.chatID,
				targetUserID: message.targetUserID,
				timestamp: new Date().toISOString(),
			});
		}

		if (message.type === "establish_connection") {
			websocketService.sendTo(message.targetUserID, {
				type: "establish_connection",
				data: message.data,
				userID: message.userID,
				targetUserID: message.targetUserID,
				timestamp: new Date().toISOString(),
			});
		}

		if (message.type === "end_video_call") {
			websocketService.sendTo(message.targetUserID, {
				type: "end_video_call",
				targetUserID: message.targetUserID,
				timestamp: new Date().toISOString(),
			});
		}
	}
}

const websocketController = new WebsocketController();
export default websocketController;
