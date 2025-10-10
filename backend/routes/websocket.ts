import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
import websocketController from "../controllers/websocket.js";

function websocketRouter(this: WebSocket, rawMessage: string) {
	const message: WebsocketMessage = JSON.parse(rawMessage);
	if (message.type === "wb_user_message") {
		websocketController.postMessage(this, message);
	}

	if (message.type === "wb_user_message_stateless") {
		websocketController.postMessageStateless(this, message);
	}

	if (message.type === "wb_mood_changes") {
		websocketController.trackMoodChanges(this, message);
	}

	if (message.type === "wb_unbiased_opinion") {
		websocketController.getUnbiasedOpinion(this, message);
	}

	if (message.type === "wb_daily_check_in") {
		websocketController.dailyCheckIn(this, message);
	}
}

export default websocketRouter;
