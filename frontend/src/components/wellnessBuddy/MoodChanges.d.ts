import React from "react";
import { WBMessage } from "@common/types/wb";
export declare const getMoodInfo: (level: number | undefined) => {
    colour: string;
    text: string;
};
interface Props {
    messages: WBMessage[];
    setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
    loadingWBReply: boolean;
}
declare const MoodChanges: ({ messages, loadingWBReply }: Props) => import("react/jsx-runtime").JSX.Element | null;
export default MoodChanges;
