import { WBMessage } from '@common/types/wb';
interface Prop {
    messages: WBMessage[];
    loadingWBReply: boolean;
}
declare const WBConversationWindow: ({ messages, loadingWBReply }: Prop) => import("react/jsx-runtime").JSX.Element;
export default WBConversationWindow;
