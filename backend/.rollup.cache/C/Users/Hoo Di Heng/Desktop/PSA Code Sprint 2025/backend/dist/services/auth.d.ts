import jwt from "jsonwebtoken";
declare class AuthService {
    login(email: string, password: string): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, {
            email: string;
            role: "user" | "admin";
            password: string;
            name: string;
            position: string;
            subordinates: import("mongoose").Types.ObjectId[];
            experienceLevel: number;
            mentorshipRequests: import("mongoose").Types.DocumentArray<{
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }> & {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }>;
            skills: import("mongoose").Types.DocumentArray<{
                level: number;
                name?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                level: number;
                name?: string | null | undefined;
            }> & {
                level: number;
                name?: string | null | undefined;
            }>;
            notifications: import("mongoose").Types.DocumentArray<{
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }> & {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }>;
            careerPath: import("mongoose").Types.DocumentArray<{
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }> & {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }>;
            moods: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                level: number;
                notes: string[];
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                level: number;
                notes: string[];
            }> & {
                date: NativeDate;
                level: number;
                notes: string[];
            }>;
            createdAt: NativeDate;
            mentees: import("mongoose").Types.ObjectId[];
            lastSeen: NativeDate;
            isOnline: boolean;
            activities: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }> & {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }>;
            avatar?: string | null | undefined;
            bio?: string | null | undefined;
            supervisor?: import("mongoose").Types.ObjectId | null | undefined;
        }> & {
            email: string;
            role: "user" | "admin";
            password: string;
            name: string;
            position: string;
            subordinates: import("mongoose").Types.ObjectId[];
            experienceLevel: number;
            mentorshipRequests: import("mongoose").Types.DocumentArray<{
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }> & {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }>;
            skills: import("mongoose").Types.DocumentArray<{
                level: number;
                name?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                level: number;
                name?: string | null | undefined;
            }> & {
                level: number;
                name?: string | null | undefined;
            }>;
            notifications: import("mongoose").Types.DocumentArray<{
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }> & {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }>;
            careerPath: import("mongoose").Types.DocumentArray<{
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }> & {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }>;
            moods: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                level: number;
                notes: string[];
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                level: number;
                notes: string[];
            }> & {
                date: NativeDate;
                level: number;
                notes: string[];
            }>;
            createdAt: NativeDate;
            mentees: import("mongoose").Types.ObjectId[];
            lastSeen: NativeDate;
            isOnline: boolean;
            activities: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }> & {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }>;
            avatar?: string | null | undefined;
            bio?: string | null | undefined;
            supervisor?: import("mongoose").Types.ObjectId | null | undefined;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    signup(email: string, password: string): Promise<{
        token: string;
        user: (import("mongoose").Document<unknown, {}, {
            email: string;
            role: "user" | "admin";
            password: string;
            name: string;
            position: string;
            subordinates: import("mongoose").Types.ObjectId[];
            experienceLevel: number;
            mentorshipRequests: import("mongoose").Types.DocumentArray<{
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }> & {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }>;
            skills: import("mongoose").Types.DocumentArray<{
                level: number;
                name?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                level: number;
                name?: string | null | undefined;
            }> & {
                level: number;
                name?: string | null | undefined;
            }>;
            notifications: import("mongoose").Types.DocumentArray<{
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }> & {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }>;
            careerPath: import("mongoose").Types.DocumentArray<{
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }> & {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }>;
            moods: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                level: number;
                notes: string[];
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                level: number;
                notes: string[];
            }> & {
                date: NativeDate;
                level: number;
                notes: string[];
            }>;
            createdAt: NativeDate;
            mentees: import("mongoose").Types.ObjectId[];
            lastSeen: NativeDate;
            isOnline: boolean;
            activities: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }> & {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }>;
            avatar?: string | null | undefined;
            bio?: string | null | undefined;
            supervisor?: import("mongoose").Types.ObjectId | null | undefined;
        }> & {
            email: string;
            role: "user" | "admin";
            password: string;
            name: string;
            position: string;
            subordinates: import("mongoose").Types.ObjectId[];
            experienceLevel: number;
            mentorshipRequests: import("mongoose").Types.DocumentArray<{
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }> & {
                message?: string | null | undefined;
                sender?: import("mongoose").Types.ObjectId | null | undefined;
            }>;
            skills: import("mongoose").Types.DocumentArray<{
                level: number;
                name?: string | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                level: number;
                name?: string | null | undefined;
            }> & {
                level: number;
                name?: string | null | undefined;
            }>;
            notifications: import("mongoose").Types.DocumentArray<{
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }> & {
                createdAt: NativeDate;
                message: string;
                read: boolean;
            }>;
            careerPath: import("mongoose").Types.DocumentArray<{
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }> & {
                position: string;
                progress: number;
                skillsRequired: string[];
                startedAt?: NativeDate | null | undefined;
                endedAt?: NativeDate | null | undefined;
            }>;
            moods: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                level: number;
                notes: string[];
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                level: number;
                notes: string[];
            }> & {
                date: NativeDate;
                level: number;
                notes: string[];
            }>;
            createdAt: NativeDate;
            mentees: import("mongoose").Types.ObjectId[];
            lastSeen: NativeDate;
            isOnline: boolean;
            activities: import("mongoose").Types.DocumentArray<{
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }> & {
                date: NativeDate;
                type: "dailyCheckIn" | "mindfulness" | "mentorMessage" | "mentorVideoCall";
            }>;
            avatar?: string | null | undefined;
            bio?: string | null | undefined;
            supervisor?: import("mongoose").Types.ObjectId | null | undefined;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    validateAccessToken(accessToken: string): Promise<false | jwt.JwtPayload | undefined>;
}
declare const authService: AuthService;
export default authService;
