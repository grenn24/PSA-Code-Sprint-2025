import { User } from "@common/types/user";
interface Prop {
    recipient: User;
    type: "mentor" | "mentee";
}
declare const ChatHeader: ({ recipient, type }: Prop) => import("react/jsx-runtime").JSX.Element;
export default ChatHeader;
