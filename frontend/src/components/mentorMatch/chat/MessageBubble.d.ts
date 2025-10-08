import { Message } from "@common/types/chat";
import { ReactNode } from "react";
interface Prop {
    isSender: boolean;
    message: Message;
    updateMessage: (messageID: string, data: {
        content: string;
        type?: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata?: Record<string, any> | undefined;
    }) => Promise<void>;
}
declare const MessageBubble: ({ isSender, message, updateMessage }: Prop) => import("react/jsx-runtime").JSX.Element;
interface BubbleWrapperProp {
    children: ReactNode;
    isSender: boolean;
    message: Message;
    transparent?: boolean;
}
export declare const BubbleWrapper: ({ children, isSender, message, transparent, }: BubbleWrapperProp) => import("react/jsx-runtime").JSX.Element;
export default MessageBubble;
