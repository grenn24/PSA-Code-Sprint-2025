import mongoose from "mongoose";
declare class EventService {
    getAllEvents(condition: any): Promise<(mongoose.Document<unknown, {}, {
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
    updateEvent(eventID: string, event: any): Promise<mongoose.Document<unknown, {}, {
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
    deleteEventByID(eventID: string): Promise<mongoose.Document<unknown, {}, {
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
        startDate: NativeDate;
        endDate: NativeDate;
        description: string;
        participants: mongoose.Types.ObjectId[];
        title: string;
        categories: string[];
        mode: "online" | "offline";
        creator: mongoose.Types.ObjectId;
        comments: mongoose.Types.DocumentArray<{
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
        }> & {
            createdAt: NativeDate;
            content: string;
            author: mongoose.Types.ObjectId;
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
