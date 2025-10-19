import { User } from "@common/types/user";
import { Dispatch, SetStateAction } from "react";
interface VideoCallContextProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    targetUser: User | null;
    setLocalStream: Dispatch<SetStateAction<MediaStream | null>>;
    setRemoteStream: Dispatch<SetStateAction<MediaStream | null>>;
    setTargetUser: Dispatch<SetStateAction<User | null>>;
}
export declare const VideoCallContext: import("react").Context<VideoCallContextProps>;
export declare const useVideoCallContext: () => VideoCallContextProps;
export {};
