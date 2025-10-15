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
			.populate("creator participants comments.author")
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
		await newEvent.save();
		return await this.getEventByID(newEvent._id.toString());
	}
	async updateEvent(eventID: string, event) {
		const updatedEvent = await Event.findByIdAndUpdate(eventID, event, {
			new: true,
		});
		if (!updatedEvent) {
			throw new HttpError(
				"Event not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		return await this.getEventByID(eventID);
	}
	async joinEvent(userID: string, eventID: string) {
		const event = await Event.findById(eventID).exec();
		if (!event) {
			throw new HttpError(
				"Event not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		event.participants = [
			...event.participants,
			new mongoose.Types.ObjectId(userID),
		];
		await event.save();
		return await this.getEventByID(eventID);
	}

	async leaveEvent(userID: string, eventID: string) {
		const event = await Event.findById(eventID).exec();
		if (!event) {
			throw new HttpError(
				"Event not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		event.participants = event.participants.filter(
			(participant) => participant.toString() !== userID
		);
		await event.save();
		return await this.getEventByID(eventID);
	}
}

const eventService = new EventService();

export default eventService;
