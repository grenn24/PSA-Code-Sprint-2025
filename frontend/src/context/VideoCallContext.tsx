import { User } from "@common/types/user";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface VideoCallContextProps {
	localStream: MediaStream | null;
	remoteStream: MediaStream | null;
	targetUser: User | null;
	setLocalStream: Dispatch<SetStateAction<MediaStream | null>>;
	setRemoteStream: Dispatch<SetStateAction<MediaStream | null>>;
	setTargetUser: Dispatch<SetStateAction<User | null>>;
}

export const VideoCallContext = createContext<VideoCallContextProps>({
	localStream: null,
	remoteStream: null,
	targetUser: null,
	setLocalStream: () => {},
	setRemoteStream: () => {},
	setTargetUser: () => {},
});

export const useVideoCallContext = () => useContext(VideoCallContext);
