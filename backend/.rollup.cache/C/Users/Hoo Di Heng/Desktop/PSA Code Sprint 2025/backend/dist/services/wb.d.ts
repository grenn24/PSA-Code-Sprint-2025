import { WBMessage } from "@common/types/wb.js";
declare class WBService {
    private DEFAULT_SYSTEM_PROMPT;
    postMessage(conversationId: string, data: {
        content: string;
        timestamp: Date;
    }, onDelta: (chunk: string) => void): Promise<import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: import("mongoose").Types.ObjectId;
        title: string;
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
        user: import("mongoose").Types.ObjectId;
        title: string;
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
    postMessageStateless(data: {
        content: string;
        timestamp: Date;
    }, history: WBMessage[] | undefined, onDelta: (chunk: string) => void): Promise<string>;
    trackMoodChanges(userID: string, data: {
        content: string;
        timestamp: Date;
    } | undefined, history: WBMessage[] | undefined, onDelta: (chunk: string) => void): Promise<string>;
    getUsefulTips(userID: string): Promise<{
        text: string;
        category: string;
        image: string;
    }[]>;
    createConversation(userID: string, data?: {
        content: string;
        timestamp: Date;
    }): Promise<import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: import("mongoose").Types.ObjectId;
        title: string;
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
        user: import("mongoose").Types.ObjectId;
        title: string;
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
