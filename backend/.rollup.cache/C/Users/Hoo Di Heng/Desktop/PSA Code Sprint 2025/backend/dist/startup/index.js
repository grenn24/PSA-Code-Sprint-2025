import config from "config";
import createDebug from "debug";
import db from "./db.js";
import logging from "./logging.js";
import configStartup from "./config.js";
import middlewares from "./middlewares.js";
import routes from "./routes.js";
import websocket from "./websocket.js";
const appDebug = createDebug("app:startup");
const startup = (app) => {
    configStartup();
    logging();
    db(app);
    middlewares(app);
    routes(app);
    const server = websocket(app);
    const port = process.env.PORT || config.get("PORT") || 3000;
    server?.listen(port, () => {
        appDebug(`Backend api server is running at ${config.get("BASE_URL")}`);
    });
};
export default startup;
//# sourceMappingURL=index.js.map