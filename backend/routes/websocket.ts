import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
import websocketController from "../controllers/websocket.js";

function websocketRouter(this: WebSocket, rawMessage: string) {
	const message: WebsocketMessage = JSON.parse(rawMessage);

	switch (message.type) {
		case "wb_user_message":
			websocketController.postMessage(this, message);
			break;

		case "wb_user_message_stateless":
			websocketController.postMessageStateless(this, message);
			break;

		case "wb_mood_changes":
			websocketController.trackMoodChanges(this, message);
			break;

		case "wb_unbiased_opinion":
			websocketController.getUnbiasedOpinion(this, message);
			break;

		case "wb_daily_check_in":
			websocketController.dailyCheckIn(this, message);
			break;

		case "offer_video_call":
		case "answer_video_call":
		case "establish_connection":
			websocketController.handleVideoCall(this, message);
			break;
	}
}

export default websocketRouter;
