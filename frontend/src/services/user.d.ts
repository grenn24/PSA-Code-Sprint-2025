import { Chat } from "@common/types/chat";
import { LeadershipReviewRatings, User } from "@common/types/user";
import { WBConversation } from "@common/types/wb";
import { Course } from "@common/types/course";
import { Event } from "@common/types/event";
declare class UserService {
    apiClient: import("../utilities/apiClient").ApiClient;
    getUserByID(userId: string): Promise<User>;
    getConversations(userId: string): Promise<WBConversation[]>;
    getTopMatchedMentors(userId: any, limit?: number, page?: number): Promise<User[]>;
    updateUser(userId: any, userData: any): Promise<User>;
    sendMentorshipRequest(mentorId: any, message: any): Promise<unknown>;
    getChats(userID: string): Promise<Chat[]>;
    addActivity(userID: string, activity: User["activities"][number]): Promise<void>;
    getRecommendedCourses(userID: string): Promise<Course[]>;
    getRecommendedEvents(userID: string): Promise<Event[]>;
    getPotentialPositions(userID: string): Promise<unknown>;
    predictLeadershipPotential(userID: string): Promise<number>;
    indicateInterest(userID: string, position: any): Promise<unknown>;
    submitLeadershipReview(userID: string, review: {
        ratings: LeadershipReviewRatings;
        comments?: string;
        date: Date;
    }): Promise<unknown>;
}
declare const userService: UserService;
export default userService;
