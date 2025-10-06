import http from "http";
import { WebsocketCloseCode } from "@common/constants/statusCode.js";
import config from "config";
import createDebug from "debug";
import WebSocket, { WebSocketServer } from "ws";
import authService from "../services/auth.js";
import User from "../models/user.js";
const wsDebug = createDebug("websocket");
const wsStartupDebug = createDebug("websocket:startup");
class WebsocketService {
    backendWSS = null;
    frontendWS = new Map(); // userID - frontend websocket
    init(app) {
        if (this.backendWSS) {
            return;
        }
        const server = http.createServer(app);
        const backendWSS = new WebSocketServer({ server, path: "/api" });
        backendWSS.on("connection", async (frontendWS, req) => {
            const url = new URL(req.url ?? "", `http://${req.headers.host}`);
            const accessToken = url.searchParams.get("X-Access-Token");
            if (!accessToken) {
                frontendWS.close(WebsocketCloseCode.MissingAccessToken, "Missing access token");
                return;
            }
            const payload = await authService.validateAccessToken(accessToken);
            if (!payload) {
                frontendWS.close(WebsocketCloseCode.InvalidAccessToken, "Invalid access token");
                return;
            }
            const user = await User.findById(payload.id)
                .populate("supervisor")
                .populate("subordinates")
                .populate("mentors")
                .populate("mentees")
                .populate("mentorshipRequests.sender")
                .exec();
            if (!user) {
                frontendWS.close(WebsocketCloseCode.NotFound, "User does not exist");
                return;
            }
            wsDebug(`New client connected: ${user.email}`);
            user.isOnline = true;
            await user.save();
            // Send a message to mentors and mentees
            const statusUpdateRecipientIDs = [
                ...user.mentors,
                ...user.mentees,
            ].map((user) => user._id);
            this.sendTo(statusUpdateRecipientIDs, {
                type: "USER_STATUS_UPDATE",
                data: user,
                timestamp: new Date().toISOString(),
            });
            this.frontendWS.set(payload.id, frontendWS);
            frontendWS.on("message", (message) => {
                wsDebug(`Received message from ${user.email}: ${message}`);
            });
            frontendWS.on("close", async () => {
                wsDebug(`Client disconnected: ${user.email}`);
                user.lastSeen = new Date();
                user.isOnline = false;
                await user.save();
                this.sendTo(statusUpdateRecipientIDs, {
                    type: "USER_STATUS_UPDATE",
                    data: user,
                    timestamp: new Date().toISOString(),
                });
                this.frontendWS.delete(payload.id);
            });
        });
        this.backendWSS = backendWSS;
        const url = `${config.get("NODE_ENV") === "production" ? "wss" : "ws"}://${config.get("HOST")}/api`;
        wsStartupDebug(`WebSocket server is running at ${url}`);
        return server;
    }
    disconnect() {
        this.backendWSS?.close();
    }
    // Broadcast to all clients
    broadcast(message) {
        this.frontendWS.forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(message));
            }
        });
    }
    // Send to specific client by JWT
    sendTo(userID, message) {
        const ids = Array.isArray(userID) ? userID : [userID];
        ids.forEach((id) => {
            const ws = this.frontendWS.get(id.toString());
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(message));
            }
        });
    }
    getTokenFromRequest(req) {
        // Example: extract JWT from query params: ws://host?token=...
        const url = new URL(req.url ?? "", `http://${req.headers.host}`);
        return url.searchParams.get("token") || undefined;
    }
}
const websocketService = new WebsocketService();
export default websocketService;
