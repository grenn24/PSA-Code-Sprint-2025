import React from "react";
interface Prop {
    sendMessage: (content: string, type?: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt", metadata?: Record<string, any>) => Promise<void>;
    setOpenMenuModal: React.Dispatch<React.SetStateAction<string | null>>;
}
declare const TipModalContent: ({ sendMessage, setOpenMenuModal }: Prop) => import("react/jsx-runtime").JSX.Element;
export default TipModalContent;
