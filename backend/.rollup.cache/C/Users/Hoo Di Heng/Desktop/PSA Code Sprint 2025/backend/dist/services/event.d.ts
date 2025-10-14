declare class EventService {
    getAllEvents(condition: any): Promise<(import("mongoose").Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: import("mongoose").Types.ObjectId;
        participants: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: import("mongoose").Types.ObjectId;
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
        creator: import("mongoose").Types.ObjectId;
        participants: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: import("mongoose").Types.ObjectId;
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
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getEventByID(eventID: string): Promise<import("mongoose").Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: import("mongoose").Types.ObjectId;
        participants: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: import("mongoose").Types.ObjectId;
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
        creator: import("mongoose").Types.ObjectId;
        participants: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: import("mongoose").Types.ObjectId;
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
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createEvent(event: any): Promise<import("mongoose").Document<unknown, {}, {
        title: string;
        description: string;
        startDate: NativeDate;
        endDate: NativeDate;
        categories: string[];
        mode: "online" | "offline";
        creator: import("mongoose").Types.ObjectId;
        participants: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: import("mongoose").Types.ObjectId;
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
        creator: import("mongoose").Types.ObjectId;
        participants: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            author: import("mongoose").Types.ObjectId;
            content: string;
            createdAt: NativeDate;
        }> & {
            author: import("mongoose").Types.ObjectId;
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
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
declare const eventService: EventService;
export default eventService;
