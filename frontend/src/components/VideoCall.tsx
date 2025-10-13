import React, { useRef, useEffect, useState } from "react";
import {
	Mic,
	MicOff,
	Camera,
	CameraOff,
	PhoneOff,
	Maximize2,
	Activity,
	Minimize,
	Minimize2,
} from "lucide-react";
import {
	MdMic,
	MdMicOff,
	MdFavorite,
	MdFavoriteBorder,
	MdOutlineSubtitles,
	MdOutlineSubtitlesOff,
} from "react-icons/md";
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
			onIcon: <MdMic size={24} />,
			offIcon: <MdMicOff size={24} />,
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
			on: Minimize,
			offIcon: <Maximize2 size={24} />,
			onIcon: <Minimize2 size={24} />,
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
			onIcon: <MdOutlineSubtitles size={24} />,
			offIcon: <MdOutlineSubtitlesOff size={24} />,
			tooltip: "Live Captions",
		},
		{
			onClick: () => alert("Analyzing mood..."),
			icon: <Activity size={24} />,
			tooltip: "Analyze Mood",
		},
		{
			onClick: () => setMindfulness((prev) => !prev),
			onIcon: <MdFavorite size={24} />,
			offIcon: <MdFavoriteBorder size={24} />,
			tooltip: "Mindfulness",
			on: mindfulness,
		},
	];

	return (
		<div
			className={`fixed ${
				minimized
					? "w-[320px] h-[180px] rounded-xl overflow-hidden shadow-2xl cursor-move"
					: "inset-0 flex justify-center items-center bg-black"
			} transition-all duration-500 ease-in-out`}
			style={
				minimized
					? { left: position.x, bottom: position.y, zIndex: 9999 }
					: { zIndex: 9999 }
			}
			onMouseDown={handleMouseDown}
		>
			{/* Remote video */}
			<motion.video
				ref={remoteVideoRef}
				autoPlay
				playsInline
				className="absolute"
				initial={false}
				animate={
					mindfulness
						? {
								width: 300,
								height: 300,
								borderRadius: "50%",
								top: window.innerHeight / 2 - 150, // center minus half height
								left: window.innerWidth * 0.1, // 10% from left
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
					duration: 1,
					ease: "easeInOut",
				}}
			/>

			{/* Local video */}
			<motion.video
				ref={localVideoRef}
				autoPlay
				muted
				playsInline
				className="absolute"
				initial={false}
				animate={
					mindfulness
						? {
								width: 300,
								height: 300,
								borderRadius: "50%",
								top: window.innerHeight / 2 - 150,
								left: window.innerWidth * 0.9,
								zIndex: 20,
						  }
						: {
								width: 256,
								height: 192,
								borderRadius: 12,
								top: window.innerHeight - 24 - 192,
								left: window.innerWidth - 24 - 256,
						  }
				}
				transition={{
					duration: 1,
					ease: "easeInOut",
				}}
			/>
			{/* Controls overlay */}
			{!minimized ? (
				<div className="absolute bottom-0 left-0 right-0 p-2 md:p-8 flex justify-around md:justify-start gap-2 md:gap-4 flex-wrap z-2">
					{/* CORE BUTTONS */}
					{CORE_BUTTONS.map((btn, i) => (
						<div key={i} className="relative group">
							<button
								onClick={btn.onClick}
								className={`p-2 sm:p-3 md:p-4 rounded-full transition text-white ${
									btn.danger
										? "bg-red-600 hover:bg-red-500"
										: btn.on !== undefined
										? btn.on
											? "bg-indigo-600 hover:bg-indigo-500"
											: "bg-indigo-600/50 hover:bg-indigo-500/70 backdrop-blur-sm"
										: "bg-indigo-600/50 hover:bg-indigo-500/70 backdrop-blur-sm"
								}`}
							>
								{btn.on !== undefined
									? btn.on
										? btn.onIcon
										: btn.offIcon
									: btn.icon}
							</button>
							{/* Tooltip */}
							<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
								{btn.tooltip}
							</div>
						</div>
					))}

					{/* Divider */}
					<div className="w-px bg-white/30 mx-2"></div>

					{/* EXTRA FEATURES */}
					{EXTRA_BUTTONS.map((btn, i) => (
						<div key={i} className="relative group">
							<button
								onClick={btn.onClick}
								className={`p-2 sm:p-3 md:p-4 rounded-full transition text-white ${
									btn.on !== undefined && btn.on
										? "bg-indigo-600 hover:bg-indigo-500"
										: "bg-indigo-600/50 hover:bg-indigo-500/70 backdrop-blur-sm"
								}`}
							>
								{btn.on !== undefined
									? btn.on
										? btn.onIcon
										: btn.offIcon
									: btn.icon}
							</button>
							<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
								{btn.tooltip}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
					<div className="flex space-x-2">
						<button
							onClick={toggleMinimize}
							className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition"
						>
							<Maximize2 size={20} />
						</button>
						<button
							onClick={onEndCall}
							className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition"
						>
							<PhoneOff size={20} />
						</button>
						<button
							onClick={toggleMic}
							className={`p-2 rounded-full transition text-white ${
								micOn
									? "bg-indigo-600 hover:bg-indigo-500"
									: "bg-red-600 hover:bg-red-500"
							}`}
						>
							{micOn ? <Mic size={20} /> : <MicOff size={20} />}
						</button>
						<button
							onClick={toggleCamera}
							className={`p-2 rounded-full transition text-white ${
								cameraOn
									? "bg-indigo-600 hover:bg-indigo-500"
									: "bg-red-600 hover:bg-red-500"
							}`}
						>
							{cameraOn ? (
								<Camera size={20} />
							) : (
								<CameraOff size={20} />
							)}
						</button>
					</div>
				</div>
			)}
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
