import { Chat, Message } from "@common/types/chat";
declare class ChatService {
    apiClient: import("../utilities/apiClient").ApiClient;
    peerConnection: RTCPeerConnection | null;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    private pendingCandidates;
    onLocalStream?: (stream: MediaStream | null) => void;
    onRemoteStream?: (stream: MediaStream | null) => void;
    createChat(participantIDs: string[]): Promise<Chat>;
    postMessage(chatID: string, { sender: senderID, content, type, metadata, createdAt, }: {
        sender: string;
        content: string;
        type?: Message["type"];
        metadata?: Record<string, any>;
        createdAt?: Date;
    }): Promise<Message>;
    updateMessage(messageID: string, chatID: string, data: {
        content: string;
        type?: Message["type"];
        metadata?: Record<string, any>;
    }): Promise<Message>;
    markMessagesAsRead(chatID: string): Promise<Chat>;
    addICECandidate(candidate: RTCIceCandidateInit): Promise<void>;
    offerVideoCall(targetUserID: string, chatID: string): Promise<void>;
    answerVideoCall(targetUserID: string, chatID: string, offer: RTCSessionDescriptionInit): Promise<void>;
    endVideoCall(targetUserID: string): Promise<void>;
}
declare const chatService: ChatService;
export default chatService;
