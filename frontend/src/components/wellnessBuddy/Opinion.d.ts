import React from "react";
import { WBMessage } from "@common/types/wb";
interface Prop {
    messages: WBMessage[];
    setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
    loadingWBReply: boolean;
    setLoadingWBReply: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const Opinion: ({ messages, setMessages, loadingWBReply, setLoadingWBReply, }: Prop) => import("react/jsx-runtime").JSX.Element;
export default Opinion;
