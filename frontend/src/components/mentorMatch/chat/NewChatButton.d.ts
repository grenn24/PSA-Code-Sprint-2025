import { Chat } from "@common/types/chat";
import React from "react";
interface Prop {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setSelectedChatID: React.Dispatch<React.SetStateAction<string | null>>;
}
declare const NewChatButton: ({ chats, setChats, setSelectedChatID }: Prop) => import("react/jsx-runtime").JSX.Element;
export default NewChatButton;
