import React from "react";
interface VideoCallProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    onEndCall: () => void;
}
declare const VideoCall: React.FC<VideoCallProps>;
export default VideoCall;
