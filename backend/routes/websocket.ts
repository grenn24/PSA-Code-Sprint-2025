import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
import websocketController from "../controllers/websocket.js";

function websocketRouter(this: WebSocket, rawMessage: string) {
	const message : WebsocketMessage = JSON.parse(rawMessage);
	if (message.type === "wb_user_message") {
		websocketController.postMessage(this, message);
	}
}

export default websocketRouter;
