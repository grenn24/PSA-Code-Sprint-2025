import React, { useRef, useEffect, useState } from "react";
import {
	Mic,
	MicOff,
	Camera,
	CameraOff,
	PhoneOff,
	Maximize2,
	Minimize2,
} from "lucide-react";

interface VideoCallProps {
	localStream: MediaStream | null;
	remoteStream: MediaStream | null;
	onEndCall?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
	localStream,
	remoteStream,
	onEndCall,
}) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	const [micOn, setMicOn] = useState(true);
	const [cameraOn, setCameraOn] = useState(true);
	const [fullscreen, setFullscreen] = useState(true);

	// attach streams
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

	// handle toggles
	const toggleMic = () => {
		localStream?.getAudioTracks().forEach((track) => {
			track.enabled = !track.enabled;
			setMicOn(track.enabled);
		});
	};

	const toggleCamera = () => {
		localStream?.getVideoTracks().forEach((track) => {
			track.enabled = !track.enabled;
			setCameraOn(track.enabled);
		});
	};

	const toggleFullscreen = () => setFullscreen((f) => !f);

	return (
		<div
			className={`fixed inset-0 bg-black/90 flex justify-center items-center transition-all duration-300 ${
				fullscreen ? "z-[9999]" : "z-[100]"
			}`}
		>
			{/* Remote video */}
			<video
				ref={remoteVideoRef}
				autoPlay
				playsInline
				className="w-full h-full object-cover bg-black"
			/>

			{/* Local video overlay */}
			<video
				ref={localVideoRef}
				autoPlay
				muted
				playsInline
				className="absolute bottom-6 right-6 w-64 h-48 rounded-2xl bg-black border-2 border-white/30 shadow-xl object-cover"
			/>

			{/* Control bar */}
			<div className="absolute bottom-8 w-full flex justify-center space-x-6">
				{/* Mic toggle */}
				<button
					onClick={toggleMic}
					className={`p-4 rounded-full ${
						micOn
							? "bg-gray-700 hover:bg-gray-600"
							: "bg-red-600 hover:bg-red-500"
					} text-white transition`}
				>
					{micOn ? <Mic size={24} /> : <MicOff size={24} />}
				</button>

				{/* Camera toggle */}
				<button
					onClick={toggleCamera}
					className={`p-4 rounded-full ${
						cameraOn
							? "bg-gray-700 hover:bg-gray-600"
							: "bg-red-600 hover:bg-red-500"
					} text-white transition`}
				>
					{cameraOn ? <Camera size={24} /> : <CameraOff size={24} />}
				</button>

				{/* End call */}
				<button
					onClick={onEndCall}
					className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white transition"
				>
					<PhoneOff size={24} />
				</button>

				{/* Fullscreen toggle */}
				<button
					onClick={toggleFullscreen}
					className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
				>
					{fullscreen ? (
						<Minimize2 size={24} />
					) : (
						<Maximize2 size={24} />
					)}
				</button>
			</div>
		</div>
	);
};

export default VideoCall;
