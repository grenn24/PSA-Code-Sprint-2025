import { User } from "@common/types/user";
interface Prop {
    recipient: User;
    sendMessage: (content: string, type?: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt", metadata?: Record<string, any>) => Promise<void>;
}
export declare const ChatMenuButton: ({ recipient, sendMessage }: Prop) => import("react/jsx-runtime").JSX.Element;
interface ModalProps {
    type: string | null;
    sendMessage: (content: string, type?: "text" | "file" | "tip" | "quiz" | "poll" | "feedback" | "feedbackRequest" | "question" | "moodUpdate" | "wellbeingPrompt", metadata?: Record<string, any>) => Promise<void>;
    closeModal: () => void;
}
export declare const ChatMenuModal: ({ type, sendMessage, closeModal, }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export {};
