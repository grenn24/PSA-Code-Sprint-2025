declare class WBService {
    postMessage(conversationId: string, userMessage: string): Promise<string>;
    createConversation(userID: string, userMessage: string): Promise<import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: import("mongoose").Types.ObjectId;
        messages: import("mongoose").Types.DocumentArray<{
            text: string;
            role: "user" | "wb";
            timestamp: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            text: string;
            role: "user" | "wb";
            timestamp: NativeDate;
        }> & {
            text: string;
            role: "user" | "wb";
            timestamp: NativeDate;
        }>;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        user: import("mongoose").Types.ObjectId;
        messages: import("mongoose").Types.DocumentArray<{
            text: string;
            role: "user" | "wb";
            timestamp: NativeDate;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            text: string;
            role: "user" | "wb";
            timestamp: NativeDate;
        }> & {
            text: string;
            role: "user" | "wb";
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
