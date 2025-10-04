import { Express } from "express";
import websocketService from "../utilities/websocket.js";
import { WebSocketServer } from "ws";

export const wss: WebSocketServer | null = null;
const websocket = (app: Express) => {
	return websocketService.init(app);
};

export default websocket;
