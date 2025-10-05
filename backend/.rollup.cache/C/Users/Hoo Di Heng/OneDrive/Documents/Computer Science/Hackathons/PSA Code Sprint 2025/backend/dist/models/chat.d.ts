import { Schema } from "mongoose";
declare const Chat: import("mongoose").Model<{
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }> & {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }>;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }> & {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }>;
}> & {
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }> & {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }>;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }> & {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }> & {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }>;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }> & {
        createdAt: NativeDate;
        sender: import("mongoose").Types.ObjectId;
        read: boolean;
        content: string;
        readAt?: NativeDate | null | undefined;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Chat;
