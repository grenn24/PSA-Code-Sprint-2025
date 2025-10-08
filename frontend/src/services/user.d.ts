import { Chat } from "@common/types/chat";
import { User } from "@common/types/user";
import { WBConversation } from "@common/types/wb";
declare class UserService {
    apiClient: import("../utilities/apiClient").ApiClient;
    getUserByID(userId: string): Promise<User>;
    getConversations(userId: string): Promise<WBConversation[]>;
    getTopMatchedMentors(userId: any, limit?: number, page?: number): Promise<User[]>;
    updateUser(userId: any, userData: any): Promise<User>;
    sendMentorshipRequest(mentorId: any, message: any): Promise<unknown>;
    getChats(userID: string): Promise<Chat[]>;
}
declare const userService: UserService;
export default userService;
