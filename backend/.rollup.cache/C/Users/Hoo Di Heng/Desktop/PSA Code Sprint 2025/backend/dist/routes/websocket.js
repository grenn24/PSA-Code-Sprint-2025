import websocketController from "../controllers/websocket.js";
function websocketRouter(rawMessage) {
    const message = JSON.parse(rawMessage);
    if (message.type === "wb_user_message") {
        websocketController.postMessage(this, message);
    }
}
export default websocketRouter;
//# sourceMappingURL=websocket.js.map