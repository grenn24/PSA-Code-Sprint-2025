import { Schema } from "mongoose";
declare const Event: import("mongoose").Model<{
    description: string;
    title: string;
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
        filename: string;
        s3Filename: string;
        folder: string[];
        description: string;
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    description: string;
    title: string;
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
        filename: string;
        s3Filename: string;
        folder: string[];
        description: string;
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}> & {
    description: string;
    title: string;
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
        filename: string;
        s3Filename: string;
        folder: string[];
        description: string;
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    description: string;
    title: string;
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
        filename: string;
        s3Filename: string;
        folder: string[];
        description: string;
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    description: string;
    title: string;
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
        filename: string;
        s3Filename: string;
        folder: string[];
        description: string;
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}>> & import("mongoose").FlatRecord<{
    description: string;
    title: string;
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
        filename: string;
        s3Filename: string;
        folder: string[];
        description: string;
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Event;
