import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../middlewares/error.js";
import userService from "../services/user.js";

class UserController {
	async getAllUsers(request: Request, response: Response) {
		response.status(200).send(await userService.getAllUsers());
	}

	async createUser(request: Request, response: Response) {
		response.status(201).send(await userService.createUser(request.body));
	}

	async getUserByID(request: Request, response: Response) {
		const userID = response.locals._id;
		response.status(200).send(await userService.getUserByID(userID));
	}

	async updateUser(request: Request, response: Response) {
		const userID = response.locals._id;
		response
			.status(200)
			.send(await userService.updateUser(userID, request.body));
	}

	async addNotification(request: Request, response: Response) {
		const userID = response.locals._id;
		response
			.status(200)
			.send(
				await userService.addNotification(userID, request.body.message)
			);
	}

	async sendMentorshipRequest(request: Request, response: Response) {
		const userID = response.locals.user?.id;
		const mentorID = response.locals._id;
		response
			.status(200)
			.send(
				await userService.sendMentorshipRequest(
					userID,
					mentorID,
					request.body.message
				)
			);
	}

	async deleteAllUsers(request: Request, response: Response) {
		response.status(200).send(await userService.deleteAllUsers());
	}

	async getTopMatchedMentors(request: Request, response: Response) {
		const userID = response.locals._id;
		const limit = request.query.limit
			? Number(request.query.limit)
			: undefined;
			const page = request.query.page
			? Number(request.query.page)
			: undefined;
		response
			.status(200)
			.send(await userService.getTopMatchedMentors(userID, limit, page));
	}

	async getChats(request: Request, response: Response) {
		const userID = response.locals._id;
		response.status(200).send(await userService.getChats(userID));
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

const userController = new UserController();
export default userController;
