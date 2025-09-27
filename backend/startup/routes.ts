import express, { Express } from "express";
import route1 from "../routes/route1";
import auth from "../routes/auth";
import error from "../middlewares/error";
import morgan from "morgan";
import cors from "../middlewares/cors";

const routes = (app: Express) => {
	const apiRouter = express.Router();
	
	// Route1-related routes
	apiRouter.use("/route1", route1);

	// Auth-related routes
	apiRouter.use("/auth", auth);

	// Log errors
	apiRouter.use(error);

	// Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});

	app.use("/api", apiRouter);
};

export default routes;