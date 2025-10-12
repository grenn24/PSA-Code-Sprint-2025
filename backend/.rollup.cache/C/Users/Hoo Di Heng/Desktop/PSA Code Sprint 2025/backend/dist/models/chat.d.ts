import { Schema } from "mongoose";
declare const Chat: import("mongoose").Model<{
    messages: import("mongoose").Types.DocumentArray<{
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }> & {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }>;
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    messages: import("mongoose").Types.DocumentArray<{
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }> & {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }>;
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
}> & {
    messages: import("mongoose").Types.DocumentArray<{
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }> & {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }>;
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    messages: import("mongoose").Types.DocumentArray<{
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }> & {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }>;
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    messages: import("mongoose").Types.DocumentArray<{
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }> & {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }>;
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
}>> & import("mongoose").FlatRecord<{
    messages: import("mongoose").Types.DocumentArray<{
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }> & {
        content: string;
        type: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata: any;
        createdAt: NativeDate;
        read: boolean;
        sender: import("mongoose").Types.ObjectId;
        readAt?: NativeDate | null | undefined;
    }>;
    createdAt: NativeDate;
    participants: import("mongoose").Types.ObjectId[];
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Chat;
