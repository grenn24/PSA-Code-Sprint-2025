import React, { useRef, useEffect, useState } from "react";
import {
	Mic,
	MicOff,
	Camera,
	CameraOff,
	PhoneOff,
	Maximize2,
	Minimize2,
	Subtitles,
	Activity,
	Heart,
} from "lucide-react";
import { motion } from "framer-motion";

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
	const [mindfulness, setMindfulness] = useState(false);
	const [micOn, setMicOn] = useState(true);
	const [cameraOn, setCameraOn] = useState(true);
	const [minimized, setMinimized] = useState(false);
	const [captionsOn, setCaptionsOn] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [position, setPosition] = useState({ x: 20, y: 20 });
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

	const toggleCaptions = () => setCaptionsOn((prev) => !prev);
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

	const CORE_BUTTONS = [
		{
			onClick: toggleMic,
			on: micOn,
			onIcon: <Mic size={24} />,
			offIcon: <MicOff size={24} />,
			tooltip: micOn ? "Mute Microphone" : "Unmute Microphone",
		},
		{
			onClick: toggleCamera,
			on: cameraOn,
			onIcon: <Camera size={24} />,
			offIcon: <CameraOff size={24} />,
			tooltip: cameraOn ? "Turn off Camera" : "Turn on Camera",
		},
		{
			onClick: toggleMinimize,
			icon: <Maximize2 size={24} />,
			tooltip: minimized ? "Maximize Call" : "Minimize Call",
		},
		{
			onClick: onEndCall,
			icon: <PhoneOff size={24} />,
			tooltip: "End Call",
			danger: true,
		},
	];

	const EXTRA_BUTTONS = [
		{
			onClick: toggleCaptions,
			on: captionsOn,
			icon: <Subtitles size={24} />,
			tooltip: "Live Captions",
		},
		{
			onClick: () => alert("Analyzing mood..."),
			icon: <Activity size={24} />,
			tooltip: "Analyze Mood",
		},
		{
			onClick: () => setMindfulness((prev) => !prev),
			icon: <Heart size={24} />,
			tooltip: "Mindfulness",
			on: mindfulness,
		},
	];

	return (
		<div
			className={`fixed inset-0 transition-all duration-500 ease-in-out ${
				minimized ? "w-[320px] h-[180px] rounded-xl cursor-move" : ""
			}`}
			style={
				minimized
					? { left: position.x, bottom: position.y, zIndex: 9999 }
					: { zIndex: 9999 }
			}
			onMouseDown={handleMouseDown}
		>
			{/* Mindfulness background */}
			{mindfulness && (
				<div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 transition-colors duration-500" />
			)}

			{/* Remote video */}
			<motion.video
				ref={remoteVideoRef}
				autoPlay
				playsInline
				className="object-cover z-10"
				style={{ position: mindfulness ? "absolute" : "relative" }}
				animate={
					mindfulness
						? {
								width: 192,
								height: 192,
								borderRadius: "50%",
								top: "30%",
								left: "25%",
								rotate: [0, 5, -5, 0],
								y: [0, -15, 15, 0],
								zIndex: 20,
						  }
						: {
								width: "100%",
								height: "100%",
								borderRadius: 0,
								top: 0,
								left: 0,
						  }
				}
				transition={{
					duration: 4,
					repeat: mindfulness ? Infinity : 0,
					repeatType: "mirror",
					ease: "easeInOut",
				}}
			/>

			{/* Local video */}
			{!minimized && (
				<motion.video
					ref={localVideoRef}
					autoPlay
					muted
					playsInline
					className="absolute z-10"
					animate={
						mindfulness
							? {
									width: 192,
									height: 192,
									borderRadius: "50%",
									top: "30%",
									right: "25%",
									rotate: [0, -5, 5, 0],
									y: [0, 15, -15, 0],
									zIndex: 20,
							  }
							: {
									width: 256,
									height: 192,
									borderRadius: 12,
									bottom: 24,
									right: 24,
							  }
					}
					transition={{
						duration: 4,
						repeat: mindfulness ? Infinity : 0,
						repeatType: "mirror",
						ease: "easeInOut",
					}}
				/>
			)}

			{/* Mindfulness overlay text & button */}
			{mindfulness && (
				<div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-white pointer-events-none">
					<motion.div
						className="text-center text-2xl font-light tracking-wide pointer-events-auto"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						✨ Take a deep breath together ✨
						<p className="text-sm mt-2 opacity-70">
							Feel the present moment
						</p>
					</motion.div>
					<button
						onClick={() => setMindfulness(false)}
						className="mt-12 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-lg text-white font-medium pointer-events-auto transition"
					>
						End Mindfulness
					</button>
				</div>
			)}
		</div>
	);
};

export default VideoCall;
