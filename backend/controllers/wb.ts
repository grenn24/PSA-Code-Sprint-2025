import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../middlewares/error.js";
import wbService from "../services/wb.js";

class WBController {
	async postMessage(request: Request, response: Response) {
		const conversationID = response.locals._id;
		const userMessage = request.body?.message;
		response
			.status(200)
			.send(await wbService.postMessage(conversationID, userMessage));
	}

	async createConversation(request: Request, response: Response) {
		const user = response.locals.user;
		const userMessage = request.body?.message;
		response
			.status(200)
			.send(await wbService.createConversation(user.id, userMessage));
	}
	catchErrors(handler) {
		return async (
			request: Request,
			response: Response,
			next: NextFunction
		) => {
			try {
				await handler(request, response);
			} catch (err) {
				// Custom response errors
				if (err instanceof HttpError) {
					// Custom response error
					response.status(err.errorCode).send(err);
					return;
				} else if (
					err instanceof mongoose.Error.DocumentNotFoundError ||
					err instanceof mongoose.Error.ValidationError
				) {
					response.status(400).send({ message: err.message });
					return;
				} else {
					// Internal Server Errors
					next(err);
				}
			}
		};
	}
}

const wbController = new WBController();
export default wbController;
