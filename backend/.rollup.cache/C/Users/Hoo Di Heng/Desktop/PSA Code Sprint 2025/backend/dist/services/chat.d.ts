import { Message } from "@common/types/chat.js";
declare class ChatService {
    getChatByID(chatID: string): Promise<import("mongoose").Document<unknown, {}, {
        participants: import("mongoose").Types.ObjectId[];
        messages: import("mongoose").Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    }> & {
        participants: import("mongoose").Types.ObjectId[];
        messages: import("mongoose").Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    postMessage(chatID: string, { sender: senderID, content, type, metadata, createdAt, }: {
        sender: string;
        content: string;
        type?: Message["type"];
        metadata?: Record<string, any>;
        createdAt?: Date;
    }): Promise<import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        content: string;
        sender: import("mongoose").Types.ObjectId;
        createdAt: NativeDate;
        read: boolean;
        metadata: any;
        readAt?: NativeDate | null | undefined;
    }> & {
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        content: string;
        sender: import("mongoose").Types.ObjectId;
        createdAt: NativeDate;
        read: boolean;
        metadata: any;
        readAt?: NativeDate | null | undefined;
    }>;
    updateMessage(updaterID: string, messageID: string, chatID: string, { content, type, metadata, }: {
        content: string;
        type?: Message["type"];
        metadata?: Record<string, any>;
    }): Promise<import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        content: string;
        sender: import("mongoose").Types.ObjectId;
        createdAt: NativeDate;
        read: boolean;
        metadata: any;
        readAt?: NativeDate | null | undefined;
    }> & {
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        content: string;
        sender: import("mongoose").Types.ObjectId;
        createdAt: NativeDate;
        read: boolean;
        metadata: any;
        readAt?: NativeDate | null | undefined;
    }>;
    createChat(participantIDs: string[]): Promise<import("mongoose").Document<unknown, {}, {
        participants: import("mongoose").Types.ObjectId[];
        messages: import("mongoose").Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    }> & {
        participants: import("mongoose").Types.ObjectId[];
        messages: import("mongoose").Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    markMessagesAsRead(chatID: string, userID: string): Promise<import("mongoose").Document<unknown, {}, {
        participants: import("mongoose").Types.ObjectId[];
        messages: import("mongoose").Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    }> & {
        participants: import("mongoose").Types.ObjectId[];
        messages: import("mongoose").Types.DocumentArray<{
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }> & {
            type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
            content: string;
            sender: import("mongoose").Types.ObjectId;
            createdAt: NativeDate;
            read: boolean;
            metadata: any;
            readAt?: NativeDate | null | undefined;
        }>;
        createdAt: NativeDate;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    offerVideoCall(offer: any, targetUserID: string, chatID: string): Promise<void>;
    answerVideoCall(answer: any, targetUserID: string, chatID: string): Promise<void>;
}
export declare const chatService: ChatService;
export default chatService;
