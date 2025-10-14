import { NextFunction, Request, Response } from "express";
import eventService from "../services/event.js";
import { HttpError } from "../middlewares/error.js";
import mongoose from "mongoose";

class EventController {
	async getAllEvents(request: Request, response: Response) {
		const events = await eventService.getAllEvents(request.query);
		response.status(200).send(events);
	}
	async getEventByID(request: Request, response: Response) {
		const event = await eventService.getEventByID(response.locals._id);
		response.status(200).send(event);
	}
	async createEvent(request: Request, response: Response) {
		const event = await eventService.createEvent(request.body);
		response.status(200).send(event);
	}
	async joinEvent(request: Request, response: Response) {
		const eventID = response.locals._id;
		const user = response.locals.user;
		const event = await eventService.joinEvent(user.id, eventID);
		response.status(200).send(event);
	}
	async leaveEvent(request: Request, response: Response) {
		const eventID = response.locals._id;
		const user = response.locals.user;
		const event = await eventService.leaveEvent(user.id, eventID);
		response.status(200).send(event);
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

const eventController = new EventController();
export default eventController;
