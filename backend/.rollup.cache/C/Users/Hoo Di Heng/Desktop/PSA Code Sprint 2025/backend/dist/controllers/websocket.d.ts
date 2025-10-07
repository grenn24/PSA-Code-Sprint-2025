import { WebsocketMessage } from "@common/types/http.js";
import WebSocket from "ws";
declare class WebsocketController {
    postMessage(websocket: WebSocket, message: WebsocketMessage): Promise<void>;
}
declare const websocketController: WebsocketController;
export default websocketController;
