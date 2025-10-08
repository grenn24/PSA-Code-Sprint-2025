import { WebsocketMessage } from "@common/types/http";
export interface Listener {
    (message: WebsocketMessage): void;
}
declare class WebsocketService {
    private backendWSS;
    private url;
    private listeners;
    connect(): void;
    disconnect(): void;
    send(message: WebsocketMessage): void;
    addListener(listener: Listener): void;
    addListeners(listeners: Listener[]): void;
    removeListener(listener: Listener): void;
    removeListeners(listeners: Listener[]): void;
}
declare const websocketService: WebsocketService;
export default websocketService;
