import express, { Express } from "express";
import route1 from "../routes/route1.js";
import auth from "../routes/auth.js";
import error from "../middlewares/error.js";
import userRouter from "../routes/user.js";
import chatRouter from "../routes/chat.js";
import s3Router from "../routes/s3.js";

const routes = (app: Express) => {
	const apiRouter = express.Router();
	app.use("/api", apiRouter);

	// Route1-related routes
	apiRouter.use("/route1", route1);

	// Auth-related routes
	apiRouter.use("/auth", auth);

	apiRouter.use("/user", userRouter);

	apiRouter.use("/chat", chatRouter);

	apiRouter.use("/s3", s3Router)

	// Log errors
	apiRouter.use(error);

	// Handle missed api routes
	apiRouter.use((_, res) => {
		res.status(404).send("Api route not found");
	});
};

export default routes;
