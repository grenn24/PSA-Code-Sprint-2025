import { Chat } from "@common/types/chat";
import createApiClient from "../utilities/apiClient";
import { User } from "@common/types/user";

class UserService {
	apiClient = createApiClient("/user");

	async getUserByID(userId) {
		const response = await this.apiClient.get<User>(`/${userId}`);
		return response.data;
	}

	async getTopMatchedMentors(
		userId,
		limit?: number,
		page: number = 0
	) {
		const response = await this.apiClient.get<User[]>(
			`/${userId}/top-matches`,
			{
				params: {
					limit,
					page,
				},
			}
		);
		return response.data;
	}

	async updateUser(userId, userData) {
		const response = await this.apiClient.put<any, User>(
			`/${userId}`,
			userData
		);
		return response.data;
	}

	async sendMentorshipRequest(mentorId, message) {
		const response = await this.apiClient.post(
			`/${mentorId}/mentor-requests`,
			{ message }
		);
		return response.data;
	}

	async getChats(userID: string) {
		const response = await this.apiClient.get<Chat[]>(`/${userID}/chats`);
		return response.data;
	}
}

const userService = new UserService();
export default userService;
