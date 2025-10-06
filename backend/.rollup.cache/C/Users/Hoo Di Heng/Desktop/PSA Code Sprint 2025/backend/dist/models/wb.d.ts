import { Schema } from "mongoose";
declare const WBConversation: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }> & {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }>;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }> & {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }>;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }> & {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
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
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }> & {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }> & {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }>;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }> & {
        timestamp: NativeDate;
        text: string;
        role: "user" | "wb";
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default WBConversation;
