import { HttpStatusCode } from "@common/constants/statusCode.js";
import Event from "../models/event.js";
import { HttpError } from "../middlewares/error.js";
import mongoose from "mongoose";
import s3Service from "../utilities/s3.js";
class EventService {
    async getAllEvents(condition) {
        const events = await Event.find(condition).populate("creator").exec();
        for (const event of events) {
            if (event.coverImage) {
                event.coverImage.url = await s3Service.getPublicUrl(event.coverImage.s3Filename, event.coverImage.folder);
            }
        }
        return events;
    }
    async getEventByID(eventID) {
        const event = await Event.findById(eventID)
            .populate("creator participants comments.author")
            .exec();
        if (!event) {
            throw new HttpError("Event not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        if (event.coverImage) {
            event.coverImage.url = await s3Service.getPublicUrl(event?.coverImage.s3Filename, event?.coverImage.folder);
        }
        return event;
    }
    async createEvent(event) {
        const newEvent = new Event(event);
        await newEvent.save();
        return await this.getEventByID(newEvent._id.toString());
    }
    async updateEvent(eventID, event) {
        const updatedEvent = await Event.findByIdAndUpdate(eventID, event, {
            new: true,
        });
        if (!updatedEvent) {
            throw new HttpError("Event not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        return await this.getEventByID(eventID);
    }
    async joinEvent(userID, eventID) {
        const event = await Event.findById(eventID).exec();
        if (!event) {
            throw new HttpError("Event not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        event.participants = [
            ...event.participants,
            new mongoose.Types.ObjectId(userID),
        ];
        await event.save();
        return await this.getEventByID(eventID);
    }
    async leaveEvent(userID, eventID) {
        const event = await Event.findById(eventID).exec();
        if (!event) {
            throw new HttpError("Event not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        event.participants = event.participants.filter((participant) => participant.toString() !== userID);
        await event.save();
        return await this.getEventByID(eventID);
    }
    async deleteEventByID(eventID) {
        const deletedEvent = await Event.findByIdAndDelete(eventID).exec();
        if (!deletedEvent) {
            throw new HttpError("Event not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        return deletedEvent;
    }
}
const eventService = new EventService();
export default eventService;
//# sourceMappingURL=event.js.map