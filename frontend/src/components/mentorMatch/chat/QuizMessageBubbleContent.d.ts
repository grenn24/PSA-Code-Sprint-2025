import { Message } from "@common/types/chat";
interface Prop {
    message: Message;
    isSender: boolean;
    updateMessage: (messageID: string, data: {
        content: string;
        type?: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata?: Record<string, any>;
    }) => Promise<void>;
}
declare const QuizMessageBubbleContent: ({ message, isSender, updateMessage, }: Prop) => import("react/jsx-runtime").JSX.Element;
export default QuizMessageBubbleContent;
