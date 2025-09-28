import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../middlewares/error";
import portService from "../services/port";

class PortController {
	async getAllPorts(request: Request, response: Response) {
		response.status(200).send(await portService.getAllPorts());
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

const portController = new PortController();
export default portController;
