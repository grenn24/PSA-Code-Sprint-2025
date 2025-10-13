import React from "react";
import { WBMessage } from "@common/types/wb";
interface Props {
    messages: WBMessage[];
    setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
    loadingWBReply: boolean;
    setLoadingWBReply: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const DailyCheckIn: ({ messages, setMessages, loadingWBReply, setLoadingWBReply, }: Props) => import("react/jsx-runtime").JSX.Element;
export default DailyCheckIn;
