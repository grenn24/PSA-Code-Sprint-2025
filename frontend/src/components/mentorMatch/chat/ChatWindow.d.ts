import React from "react";
import { Chat } from "@common/types/chat";
interface Prop {
    selectedChatID: string | null;
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}
declare const ChatWindow: ({ selectedChatID, chats, setChats }: Prop) => import("react/jsx-runtime").JSX.Element;
export default ChatWindow;
