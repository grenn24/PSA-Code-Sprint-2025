import express from "express";
import wbController from "../controllers/wb.js";
import { getID } from "../middlewares/request.js";
import auth from "../middlewares/auth.js";

const wbRouter = express.Router();

wbRouter.post(
	"/",
	auth("user"),
	wbController.catchErrors(wbController.createConversation.bind(wbController))
);

export default wbRouter;
