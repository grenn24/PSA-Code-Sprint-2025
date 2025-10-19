import config from "config";
import createDebug from "debug";
import { Express } from "express";
import db from "./db.js";
import logging from "./logging.js";
import configStartup from "./config.js";
import middlewares from "./middlewares.js";
import routes from "./routes.js";
import websocket from "./websocket.js";
import ml from "./ml.js";

const appDebug = createDebug("app:startup");
const startup = (app: Express) => {
	configStartup();
	logging();
	db(app);
	middlewares(app);
	routes(app);
	ml(app);

	const server = websocket(app);
	const port = process.env.PORT || config.get("PORT") || 3000;
	server?.listen(port, () => {
		appDebug(`Backend api server is running at ${config.get("BASE_URL")}`);
	});
};

export default startup;
