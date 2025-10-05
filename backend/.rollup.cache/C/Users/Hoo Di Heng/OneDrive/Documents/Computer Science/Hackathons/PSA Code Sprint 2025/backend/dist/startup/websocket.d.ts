import { Express } from "express";
import { WebSocketServer } from "ws";
export declare const wss: WebSocketServer | null;
declare const websocket: (app: Express) => import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | undefined;
export default websocket;
