import React from "react";
import { Message } from "@common/types/chat";
interface Props {
    message: Message;
    isSender: boolean;
    updateMessage: (messageID: string, data: {
        content: string;
        type?: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt";
        metadata?: Record<string, any>;
    }) => Promise<void>;
}
declare const FeedbackMessageBubbleContent: React.FC<Props>;
export default FeedbackMessageBubbleContent;
