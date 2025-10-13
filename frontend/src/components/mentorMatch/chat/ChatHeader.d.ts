import { User } from "@common/types/user";
interface Prop {
    setChatID: React.Dispatch<React.SetStateAction<string | null>>;
    chatID: string;
    recipient: User;
    type: "mentor" | "mentee";
}
declare const ChatHeader: ({ setChatID, recipient, type, chatID }: Prop) => import("react/jsx-runtime").JSX.Element;
export default ChatHeader;
