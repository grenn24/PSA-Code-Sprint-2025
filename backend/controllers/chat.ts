import { NextFunction, Request, Response } from "express";

import { HttpError } from "../middlewares/error.js";
import mongoose from "mongoose";
import chatService from "../services/chat.js";

class ChatController {
	async postMessage(request: Request, response: Response) {
		const chatID = response.locals._id;
		const message = await chatService.postMessage(chatID, request.body);
		response.status(200).send(message);
	}

	async updateMessage(request: Request, response: Response) {
		const updater = response.locals.user
		const chatID = response.locals.chatID;
		const messageID = response.locals.messageID;
		const message = await chatService.updateMessage(
			updater.id,
			messageID,
			chatID,
			request.body
		);
		response.status(200).send(message);
	}

	async createChat(request: Request, response: Response) {
		const chat = await chatService.createChat(request.body?.participants);
		response.status(200).send(chat);
	}

	async markMessagesAsRead(request: Request, response: Response) {
		const chatID = response.locals._id;
		const userID = response.locals.user?.id;
		const chat = await chatService.markMessagesAsRead(chatID, userID);
		response.status(200).send(chat);
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

const chatController = new ChatController();
export default chatController;
