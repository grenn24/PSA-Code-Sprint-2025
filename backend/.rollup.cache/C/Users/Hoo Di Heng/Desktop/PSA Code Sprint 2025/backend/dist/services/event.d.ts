import mongoose from "mongoose";
declare class EventService {
    getAllEvents(condition: any): Promise<(mongoose.Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    }> & {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getEventByID(eventID: string): Promise<mongoose.Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    }> & {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createEvent(event: any): Promise<mongoose.Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    }> & {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    joinEvent(userID: string, eventID: string): Promise<mongoose.Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    }> & {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    leaveEvent(userID: string, eventID: string): Promise<mongoose.Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    }> & {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        participants: mongoose.Types.ObjectId[];
        comments: mongoose.Types.DocumentArray<{
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: mongoose.Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }>;
        location?: string | null | undefined;
        coverImage?: {
            description: string;
            s3Filename: string;
            filename: string;
            folder: string[];
            url?: string | null | undefined;
            mimeType?: string | null | undefined;
        } | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}
declare const eventService: EventService;
export default eventService;
