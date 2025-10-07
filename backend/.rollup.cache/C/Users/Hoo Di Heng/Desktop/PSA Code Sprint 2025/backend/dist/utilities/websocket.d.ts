import http from "http";
import { WebsocketMessage } from "@common/types/http.js";
import { Express } from "express";
import WebSocket from "ws";
declare class WebsocketService {
    private backendWSS;
    private frontendWS;
    init(app: Express): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined;
    disconnect(): void;
    broadcast(message: WebsocketMessage): void;
    sendTo(userID: string | string[], message: WebsocketMessage): void;
    sendToWS(ws: WebSocket, message: WebsocketMessage): void;
    private getTokenFromRequest;
}
declare const websocketService: WebsocketService;
export default websocketService;
