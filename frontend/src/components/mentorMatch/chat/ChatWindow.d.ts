import React from "react";
import { Chat } from "@common/types/chat";
interface Prop {
    setSelectedChatID: React.Dispatch<React.SetStateAction<string | null>>;
    selectedChatID: string | null;
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}
declare const ChatWindow: ({ setSelectedChatID, selectedChatID, chats, setChats, }: Prop) => import("react/jsx-runtime").JSX.Element;
export default ChatWindow;
