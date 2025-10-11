import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
} from "react";

interface VideoCallContextProps {
	localStream: MediaStream | null;
	remoteStream: MediaStream | null;
	targetUserID: string | null;
	setLocalStream: Dispatch<SetStateAction<MediaStream | null>>;
	setRemoteStream: Dispatch<SetStateAction<MediaStream | null>>;
	setTargetUserID: Dispatch<SetStateAction<string | null>>;
}

export const VideoCallContext = createContext<VideoCallContextProps>({
	localStream: null,
	remoteStream: null,
	targetUserID: null,
	setLocalStream: () => {},
	setRemoteStream: () => {},
	setTargetUserID: () => {},
});

export const useVideoCallContext = () => useContext(VideoCallContext);
