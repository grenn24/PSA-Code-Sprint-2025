import { Chat } from "@common/types/chat";
import { Dispatch, SetStateAction } from "react";
interface MentorMatchContextProps {
    chats: Chat[];
    setChats: Dispatch<SetStateAction<Chat[]>>;
}
export declare const MentorMatchContext: import("react").Context<MentorMatchContextProps>;
export declare const useMentorMatchContext: () => MentorMatchContextProps;
export {};
