import jwt from "jsonwebtoken";
declare class AuthService {
    login(email: string, password: string): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, {
            name: string;
            role: "user" | "admin";
            createdAt: NativeDate;
            position: string;
            email: string;
            password: string;
            subordinates: import("mongoose").Types.ObjectId[];
            experienceLevel: number;
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
            mentees: import("mongoose").Types.ObjectId[];
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
            lastSeen: NativeDate;
            isOnline: boolean;
            bio?: string | null | undefined;
            supervisor?: import("mongoose").Types.ObjectId | null | undefined;
            avatar?: string | null | undefined;
        }> & {
            name: string;
            role: "user" | "admin";
            createdAt: NativeDate;
            position: string;
            email: string;
            password: string;
            subordinates: import("mongoose").Types.ObjectId[];
            experienceLevel: number;
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
            mentees: import("mongoose").Types.ObjectId[];
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
            lastSeen: NativeDate;
            isOnline: boolean;
            bio?: string | null | undefined;
            supervisor?: import("mongoose").Types.ObjectId | null | undefined;
            avatar?: string | null | undefined;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    validateAccessToken(accessToken: string): Promise<false | jwt.JwtPayload | undefined>;
}
declare const authService: AuthService;
export default authService;
