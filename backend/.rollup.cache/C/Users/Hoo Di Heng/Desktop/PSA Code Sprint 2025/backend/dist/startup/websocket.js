import websocketService from "../utilities/websocket.js";
export const wss = null;
const websocket = (app) => {
    return websocketService.init(app);
};
export default websocket;
//# sourceMappingURL=websocket.js.map