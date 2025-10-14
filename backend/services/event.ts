import { HttpStatusCode } from "@common/constants/statusCode.js";
import Event from "../models/event.js";
import { HttpError } from "../middlewares/error.js";
import mongoose from "mongoose";

class EventService {
	async getAllEvents(condition) {
		return await Event.find(condition).exec();
	}
	async getEventByID(eventID: string) {
		const event = await Event.findById(eventID)
			.populate("creator participants")
			.exec();
		if (!event) {
			throw new HttpError(
				"Event not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		return event;
	}
	async createEvent(event) {
		const newEvent = new Event(event);
		return await newEvent.save();
	}
	async joinEvent(userID: string, eventID: string) {
		const event = await Event.findById(eventID)
			.populate("creator participants")
			.exec();
		if (!event) {
			throw new HttpError(
				"Event not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		event.participants.push(new mongoose.Types.ObjectId(userID));
		return await event.save();
	}

	async leaveEvent(userID: string, eventID: string) {
		const event = await Event.findById(eventID)
			.populate("creator participants")
			.exec();
		if (!event) {
			throw new HttpError(
				"Event not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		event.participants.filter(
			(participant) => participant.toString() !== userID
		);
		return await event.save();
	}
}

const eventService = new EventService();

export default eventService;
