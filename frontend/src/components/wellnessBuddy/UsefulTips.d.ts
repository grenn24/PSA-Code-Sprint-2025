import React from "react";
import { WBMessage } from "@common/types/wb";
interface Tip {
    text: string;
    category?: string;
    image?: string;
}
interface Props {
    messages: WBMessage[];
    loadingWBReply: boolean;
    tips: Tip[];
    setTips: React.Dispatch<React.SetStateAction<Tip[]>>;
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}
declare const UsefulTips: ({ messages, loadingWBReply, tips, setTips, index, setIndex }: Props) => import("react/jsx-runtime").JSX.Element;
export default UsefulTips;
