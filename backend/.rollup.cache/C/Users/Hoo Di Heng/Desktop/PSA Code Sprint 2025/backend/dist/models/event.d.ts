import { Schema } from "mongoose";
declare const Event: import("mongoose").Model<{
    title: string;
    description: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
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
    title: string;
    description: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
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
    title: string;
    description: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
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
    title: string;
    description: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
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
    title: string;
    description: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
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
    title: string;
    description: string;
    participants: import("mongoose").Types.ObjectId[];
    startDate: NativeDate;
    endDate: NativeDate;
    category: string[];
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
