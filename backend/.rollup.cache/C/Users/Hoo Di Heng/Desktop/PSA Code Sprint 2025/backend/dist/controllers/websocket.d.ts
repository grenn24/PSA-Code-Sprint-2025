import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
declare class WebsocketController {
    postMessage(websocket: WebSocket, message: WebsocketMessage): Promise<void>;
    postMessageStateless(websocket: WebSocket, message: WebsocketMessage): Promise<void>;
    trackMoodChanges(websocket: WebSocket, message: WebsocketMessage): Promise<void>;
    getUnbiasedOpinion(websocket: WebSocket, message: WebsocketMessage): Promise<void>;
    dailyCheckIn(websocket: WebSocket, message: WebsocketMessage): Promise<void>;
    handleVideoCall(websocket: WebSocket, message: WebsocketMessage): void;
}
declare const websocketController: WebsocketController;
export default websocketController;
