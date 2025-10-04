import http from "http";
import { WebsocketCloseCode } from "@common/constants/statusCode.js";
import { WebsocketMessage } from "@common/types/http.js";
import config from "config";
import createDebug from "debug";
import { Express } from "express";
import WebSocket, { WebSocketServer } from "ws";
import authService from "../services/auth.js";
import userService from "../services/user.js";

const wsDebug = createDebug("websocket");
const wsStartupDebug = createDebug("websocket:startup");
class WebsocketService {
	private backendWSS: WebSocketServer | null = null;
	private frontendWS = new Map<string, WebSocket>(); // userID - frontend websocket

	init(app: Express) {
		if (this.backendWSS) {
			return;
		}
		const server = http.createServer(app);
		const backendWSS = new WebSocketServer({ server, path: "/api" });

		backendWSS.on("connection", async (frontendWS, req) => {
			wsDebug(`New client connected`);

			const url = new URL(req.url ?? "", `http://${req.headers.host}`);
			const accessToken = url.searchParams.get("X-Access-Token");

			if (!accessToken) {
				frontendWS.close(
					WebsocketCloseCode.MissingAccessToken,
					"Missing access token"
				);
				return;
			}
			const payload = await authService.validateAccessToken(accessToken);

			if (!payload) {
				frontendWS.close(
					WebsocketCloseCode.InvalidAccessToken,
					"Invalid access token"
				);
				return;
			}
			this.frontendWS.set(payload.id, frontendWS);
			// Send notifications on initial connection
			this.sendTo(payload.id, {
				type: "NOTIFICATIONS",
				data: await userService.getNotifications(payload.id),
				timestamp: new Date().toISOString(),
			});
			frontendWS.on("message", (message) => {
				wsDebug(`Received message from ${payload.id}: ${message}`);
			});
			frontendWS.on("close", () => {
				wsDebug(`Client disconnected: ${payload.id}`);
				this.frontendWS.delete(payload.id);
			});
		});
		this.backendWSS = backendWSS;
		const url = `${
			config.get("NODE_ENV") === "production" ? "wss" : "ws"
		}://${config.get("HOST")}/api`;
		wsStartupDebug(`WebSocket server is running at ${url}`);
		return server;
	}

	disconnect() {
		this.backendWSS?.close();
	}

	// Broadcast to all clients
	broadcast(message: WebsocketMessage) {
		this.frontendWS.forEach((ws) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(message));
			}
		});
	}

	// Send to specific client by JWT
	sendTo(token: string, message: WebsocketMessage) {
		const ws = this.frontendWS.get(token);
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(message));
		}
	}

	private getTokenFromRequest(req: import("http").IncomingMessage) {
		// Example: extract JWT from query params: ws://host?token=...
		const url = new URL(req.url ?? "", `http://${req.headers.host}`);
		return url.searchParams.get("token") || undefined;
	}
}

const websocketService = new WebsocketService();
export default websocketService;
