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
	onEndCall: () => void;
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
	const [minimized, setMinimized] = useState(false);

	// for dragging minimized window
	const [position, setPosition] = useState({ x: 20, y: 20 });
	const [dragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

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

	const toggleMinimize = () => setMinimized((prev) => !prev);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!minimized) return;
		setDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging) {
			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			});
		}
	};

	const handleMouseUp = () => setDragging(false);

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	});

	return (
		<div
			className={`fixed ${
				minimized
					? "w-[320px] h-[180px] rounded-xl overflow-hidden shadow-2xl cursor-move"
					: "inset-0 flex justify-center items-center bg-black/90"
			} transition-all duration-500 ease-in-out`}
			style={
				minimized
					? {
							left: position.x,
							bottom: position.y,
							zIndex: 9999,
					  }
					: { zIndex: 9999 }
			}
			onMouseDown={handleMouseDown}
		>
			{/* Remote video */}
			<video
				ref={remoteVideoRef}
				autoPlay
				playsInline
				className={`object-cover w-full h-full ${
					minimized ? "rounded-xl" : ""
				}`}
			/>

			{/* Local video overlay (only in fullscreen) */}
			{!minimized && (
				<video
					ref={localVideoRef}
					autoPlay
					muted
					playsInline
					className="absolute bottom-6 right-6 w-64 h-48 rounded-xl bg-black border-2 border-white/30 shadow-lg object-cover"
				/>
			)}

			{/* Controls overlay */}
			{!minimized && (
				<div className="absolute bottom-8 w-full flex justify-center space-x-6">
					{/* Mic toggle */}
					<button
						onClick={toggleMic}
						className={`p-4 rounded-full transition text-white ${
							micOn
								? "bg-indigo-600 hover:bg-indigo-500"
								: "bg-red-600 hover:bg-red-500"
						}`}
					>
						{micOn ? <Mic size={24} /> : <MicOff size={24} />}
					</button>

					{/* Camera toggle */}
					<button
						onClick={toggleCamera}
						className={`p-4 rounded-full transition text-white ${
							cameraOn
								? "bg-indigo-600 hover:bg-indigo-500"
								: "bg-red-600 hover:bg-red-500"
						}`}
					>
						{cameraOn ? (
							<Camera size={24} />
						) : (
							<CameraOff size={24} />
						)}
					</button>

					{/* End call */}
					<button
						onClick={onEndCall}
						className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white transition"
					>
						<PhoneOff size={24} />
					</button>

					{/* Minimize toggle */}
					<button
						onClick={toggleMinimize}
						className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition"
					>
						{minimized ? (
							<Maximize2 size={24} />
						) : (
							<Minimize2 size={24} />
						)}
					</button>
				</div>
			)}
		</div>
	);
};

export default VideoCall;
