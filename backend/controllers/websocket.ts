import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
import wbService from "../services/wb.js";
import websocketService from "../utilities/websocket.js";

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
			onDelta
		);
		websocketService.sendToWS(websocket, {
			type: "wb_stream_end",
			data: response,
			timestamp: new Date().toISOString(),
			conversationID: message.conversationID,
		});
	}

	async trackMoodChanges(
		websocket: WebSocket,
		message: WebsocketMessage
	) {
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
}

const websocketController = new WebsocketController();
export default websocketController;
