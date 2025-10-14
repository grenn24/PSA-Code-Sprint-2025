import { HttpStatusCode } from "@common/constants/statusCode.js";
import Event from "../models/event.js";
import { HttpError } from "../middlewares/error.js";

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
}

const eventService = new EventService();

export default eventService;
