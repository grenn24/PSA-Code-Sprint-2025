import websocketController from "../controllers/websocket.js";
function websocketRouter(rawMessage) {
    const message = JSON.parse(rawMessage);
    if (message.type === "wb_user_message") {
        websocketController.postMessage(this, message);
    }
    if (message.type === "wb_user_message_stateless") {
        websocketController.postMessageStateless(this, message);
    }
    if (message.type === "wb_mood_changes") {
        websocketController.trackMoodChanges(this, message);
    }
    if (message.type === "wb_unbiased_opinion") {
        websocketController.getUnbiasedOpinion(this, message);
    }
    if (message.type === "wb_daily_check_in") {
        websocketController.dailyCheckIn(this, message);
    }
}
export default websocketRouter;
//# sourceMappingURL=websocket.js.map