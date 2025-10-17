import createApiClient from "../utilities/apiClient";
import { Event } from "@common/types/event";

class EventService {
	apiClient = createApiClient("/event");

	async getAllEvents(condition = {}) {
		const response = await this.apiClient.get<Event[]>("/", {
			params: condition,
		});
		return response.data;
	}

	async getEventByID(eventID: string) {
		const response = await this.apiClient.get<Event>(`/${eventID}`);
		return response.data;
	}

	async createEvent(event) {
		const response = await this.apiClient.post<Event, Event>("/", event);
		return response.data;
	}

	async updateEvent(eventID: string, event) {
		const response = await this.apiClient.put<any, Event>(`/${eventID}`, event);
		return response.data;
	}

	async joinEvent(userID: string, eventID: string) {
		const response = await this.apiClient.post(`/${eventID}/join`,{});
		return response.data;
	}

	async leaveEvent(userID: string, eventID: string) {
		const response = await this.apiClient.post(`/${eventID}/leave`, {});
		return response.data;
	}
}

const eventService = new EventService();
export default eventService;
