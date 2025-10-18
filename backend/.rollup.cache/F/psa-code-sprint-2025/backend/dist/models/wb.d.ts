import { Schema } from "mongoose";
declare const WBConversation: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
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
    title: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
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
    title: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
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
    title: string;
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
    title: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
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
    title: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
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
    title: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default WBConversation;
