import wbService from "../services/wb.js";
import websocketService from "../utilities/websocket.js";
class WebsocketController {
    async postMessage(websocket, message) {
        const onDelta = (chunk) => websocketService.sendToWS(websocket, {
            type: "wb_stream_chunk",
            data: chunk,
            timestamp: new Date().toISOString(),
            conversationID: message.conversationID,
        });
        const response = await wbService.postMessage(message.conversationID, message.data, onDelta);
        websocketService.sendToWS(websocket, {
            type: "wb_stream_end",
            data: response,
            timestamp: new Date().toISOString(),
            conversationID: message.conversationID,
        });
    }
    async postMessageStateless(websocket, message) {
        const onDelta = (chunk) => websocketService.sendToWS(websocket, {
            type: "wb_stream_chunk",
            data: chunk,
            timestamp: new Date().toISOString(),
            conversationID: message.conversationID,
        });
        const response = await wbService.postMessageStateless(message.data, message.history, onDelta, message.systemPrompt);
        websocketService.sendToWS(websocket, {
            type: "wb_stream_end",
            data: response,
            timestamp: new Date().toISOString(),
            conversationID: message.conversationID,
        });
    }
    async trackMoodChanges(websocket, message) {
        const onDelta = (chunk) => websocketService.sendToWS(websocket, {
            type: "wb_stream_chunk",
            data: chunk,
            timestamp: new Date().toISOString(),
        });
        const response = await wbService.trackMoodChanges(message.userID, message.data, message.history, onDelta);
        websocketService.sendToWS(websocket, {
            type: "wb_stream_end",
            data: response,
            timestamp: new Date().toISOString(),
        });
    }
}
const websocketController = new WebsocketController();
export default websocketController;
//# sourceMappingURL=websocket.js.map