import { Schema } from "mongoose";
declare const Event: import("mongoose").Model<{
    description: string;
    title: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        filename: string;
        description: string;
        s3Filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    description: string;
    title: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        filename: string;
        description: string;
        s3Filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}> & {
    description: string;
    title: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        filename: string;
        description: string;
        s3Filename: string;
        folder: string[];
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
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        filename: string;
        description: string;
        s3Filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    description: string;
    title: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        filename: string;
        description: string;
        s3Filename: string;
        folder: string[];
        url?: string | null | undefined;
        mimeType?: string | null | undefined;
    } | null | undefined;
}>> & import("mongoose").FlatRecord<{
    description: string;
    title: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
    mode: "online" | "offline";
    creator: import("mongoose").Types.ObjectId;
    location?: string | null | undefined;
    coverImage?: {
        filename: string;
        description: string;
        s3Filename: string;
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
