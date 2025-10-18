import { Schema } from "mongoose";
declare const Event: import("mongoose").Model<{
    startDate: NativeDate;
    endDate: NativeDate;
    description: string;
    comments: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }> & {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }>;
    participants: import("mongoose").Types.ObjectId[];
    title: string;
    categories: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        description: string;
        s3Filename: string;
        filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    startDate: NativeDate;
    endDate: NativeDate;
    description: string;
    comments: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }> & {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }>;
    participants: import("mongoose").Types.ObjectId[];
    title: string;
    categories: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
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
    comments: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }> & {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }>;
    participants: import("mongoose").Types.ObjectId[];
    title: string;
    categories: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    startDate: NativeDate;
    endDate: NativeDate;
    description: string;
    comments: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }> & {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }>;
    participants: import("mongoose").Types.ObjectId[];
    title: string;
    categories: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        description: string;
        s3Filename: string;
        filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    startDate: NativeDate;
    endDate: NativeDate;
    description: string;
    comments: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }> & {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }>;
    participants: import("mongoose").Types.ObjectId[];
    title: string;
    categories: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        description: string;
        s3Filename: string;
        filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}>> & import("mongoose").FlatRecord<{
    startDate: NativeDate;
    endDate: NativeDate;
    description: string;
    comments: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }> & {
        createdAt: NativeDate;
        content: string;
        author: import("mongoose").Types.ObjectId;
    }>;
    participants: import("mongoose").Types.ObjectId[];
    title: string;
    categories: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Event;
