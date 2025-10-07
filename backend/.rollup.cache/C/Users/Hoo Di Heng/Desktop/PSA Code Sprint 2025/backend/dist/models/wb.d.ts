import { Schema } from "mongoose";
declare const WBConversation: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }> & {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }>;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }> & {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }>;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }> & {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }>;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }> & {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }> & {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }>;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }> & {
        role: "user" | "assistant";
        content: string;
        timestamp: NativeDate;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default WBConversation;
