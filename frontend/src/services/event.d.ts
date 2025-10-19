import { Event } from "@common/types/event";
declare class EventService {
    apiClient: import("../utilities/apiClient").ApiClient;
    getAllEvents(condition?: {}): Promise<Event[]>;
    getEventByID(eventID: string): Promise<Event>;
    createEvent(event: any): Promise<Event>;
    updateEvent(eventID: string, event: any): Promise<Event>;
    joinEvent(userID: string, eventID: string): Promise<unknown>;
    leaveEvent(userID: string, eventID: string): Promise<unknown>;
    deleteEventByID(eventID: string): Promise<Event>;
}
declare const eventService: EventService;
export default eventService;
