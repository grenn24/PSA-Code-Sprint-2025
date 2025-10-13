import { Dispatch, SetStateAction } from "react";
interface VideoCallContextProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    targetUserID: string | null;
    setLocalStream: Dispatch<SetStateAction<MediaStream | null>>;
    setRemoteStream: Dispatch<SetStateAction<MediaStream | null>>;
    setTargetUserID: Dispatch<SetStateAction<string | null>>;
}
export declare const VideoCallContext: import("react").Context<VideoCallContextProps>;
export declare const useVideoCallContext: () => VideoCallContextProps;
export {};
