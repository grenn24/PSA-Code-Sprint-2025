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
import {motion} from "framer-motion"

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
			className={`fixed ${
				minimized
					? "w-[320px] h-[180px] rounded-xl overflow-hidden shadow-2xl cursor-move"
					: "inset-0 flex justify-center items-center bg-black/90"
			} transition-all duration-500 ease-in-out`}
			style={
				minimized
					? { left: position.x, bottom: position.y, zIndex: 9999 }
					: { zIndex: 9999 }
			}
			onMouseDown={handleMouseDown}
		>
			<motion.video
				ref={remoteVideoRef}
				autoPlay
				playsInline
				className={`object-cover ${minimized ? "rounded-xl" : ""}`}
				style={{ position: mindfulness ? "absolute" : "relative" }}
				animate={
					mindfulness
						? {
								width: 192, // 48 * 4px = 192px
								height: 192,
								borderRadius: "50%",
								top: "30%",
								left: "25%",
								boxShadow: "0 0 40px rgba(255,255,255,0.3)",
								rotate: [0, 5, -5, 0],
								y: [0, -15, 15, 0], // gentle float
						  }
						: {}
				}
				transition={{
					duration: 4,
					repeat: Infinity,
					repeatType: "mirror",
					ease: "easeInOut",
				}}
			/>

			{/* Local video overlay */}
			{!minimized && (
				<motion.video
					ref={localVideoRef}
					autoPlay
					muted
					playsInline
					className={`absolute ${
						!mindfulness
							? "bottom-6 right-6 w-64 h-48 rounded-xl border-2 border-white/30 shadow-lg object-cover"
							: ""
					}`}
					animate={
						mindfulness
							? {
									width: 192,
									height: 192,
									borderRadius: "50%",
									top: "30%",
									right: "25%",
									boxShadow: "0 0 40px rgba(255,255,255,0.3)",
									rotate: [0, -5, 5, 0],
									y: [0, 15, -15, 0],
							  }
							: {}
					}
					transition={{
						duration: 4,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "easeInOut",
					}}
				/>
			)}

			{/* Controls overlay */}
			{!minimized ? (
				<div className="absolute bottom-8 w-full flex justify-center gap-4 flex-wrap">
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
								{btn.icon}
							</button>
							<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
								{btn.tooltip}
							</div>
						</div>
					))}
				</div>
			) : (
				// MINIMIZED CONTROLS ON HOVER
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
				<div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white transition-opacity duration-700">
					<motion.div
						className="text-center text-2xl font-light tracking-wide"
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
						className="mt-12 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-lg text-white font-medium transition"
					>
						End Mindfulness
					</button>
				</div>
			)}
		</div>
	);
};

export default VideoCall;
