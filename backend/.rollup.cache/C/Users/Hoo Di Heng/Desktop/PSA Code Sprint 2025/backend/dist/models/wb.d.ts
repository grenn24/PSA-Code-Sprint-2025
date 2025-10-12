import { Schema } from "mongoose";
declare const WBConversation: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    title: string;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }> & {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }>;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    title: string;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }> & {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }>;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    title: string;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }> & {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
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
    user: import("mongoose").Types.ObjectId;
    title: string;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }> & {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    title: string;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }> & {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }>;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    title: string;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }> & {
        timestamp: NativeDate;
        role: "user" | "assistant";
        content: string;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default WBConversation;
