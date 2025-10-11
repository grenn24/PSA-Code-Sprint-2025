import React, { useRef, useEffect } from "react";

interface VideoCallProps {
	localStream: MediaStream | null;
	remoteStream: MediaStream | null;
}

const VideoCall: React.FC<VideoCallProps> = ({ localStream, remoteStream }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (localVideoRef.current && localStream) {
			localVideoRef.current.srcObject = localStream;
		}
	}, [localStream]);

	useEffect(() => {
		if (remoteVideoRef.current && remoteStream) {
			remoteVideoRef.current.srcObject = remoteStream;
		}
	}, [remoteStream]);

	return (
		<div className="flex justify-center items-center h-full w-full space-x-4">
			{/* Remote video */}
			<video
				ref={remoteVideoRef}
				autoPlay
				playsInline
				className="w-2/3 h-full rounded-lg bg-black"
			/>
			{/* Local video */}
			<video
				ref={localVideoRef}
				autoPlay
				muted
				playsInline
				className="w-1/3 h-1/3 rounded-lg bg-black absolute bottom-4 right-4 shadow-lg"
			/>
		</div>
	);
};

export default VideoCall;
