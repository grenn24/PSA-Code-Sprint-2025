declare class WBService {
    private SYSTEM_PROMPT;
    postMessage(conversationId: string, data: {
        content: string;
        timestamp: Date;
    }, onDelta: (chunk: string) => void): Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    createConversation(userID: string, data?: {
        content: string;
        timestamp: Date;
    }): Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
}
declare const wbService: WBService;
export default wbService;
