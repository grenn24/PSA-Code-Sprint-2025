import React from "react";
import { User } from "@common/types/user";
interface VideoCallProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    onEndCall: () => void;
    targetUser: User | null;
}
declare const VideoCall: React.FC<VideoCallProps>;
export default VideoCall;
