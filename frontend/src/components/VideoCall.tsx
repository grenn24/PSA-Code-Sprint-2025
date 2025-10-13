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
import { motion, AnimatePresence } from "framer-motion";
import { IoPause, IoPlay, IoRefresh } from "react-icons/io5";
import { stopSpeech, textToSpeech } from "utilities/tts";
import { fadeOutAudio, pauseAudio, playAudio } from "utilities/audio";

interface VideoCallProps {
	localStream: MediaStream | null;
	remoteStream: MediaStream | null;
	onEndCall: () => void;
}

const MINDFULNESS_PHASES = [
	{
		name: "Welcome",
		caption: "Welcome to Mindfulness. Let's settle in.",
		duration: 0,
		gradientStart: "#bae6fd",
		gradientMiddle: "#bfdbfe",
		gradientEnd: "#e0e7ff",
	},
	{
		name: "Inhale",
		caption:
			"Take a deep breath... let the air fill your lungs and calm your mind.",
		duration: 10000,
		gradientStart: "#bbf7d0",
		gradientMiddle: "#5eead4",
		gradientEnd: "#bfdbfe",
	},
	{
		name: "Hold (Full)",
		caption:
			"Hold gently... feel the stillness and the weight of the present moment.",
		duration: 6000,
		gradientStart: "#bfdbfe",
		gradientMiddle: "#c7d2fe",
		gradientEnd: "#d9f99d",
	},
	{
		name: "Exhale",
		caption:
			"Exhale slowly... release tension and let go of what you no longer need.",
		duration: 10000,
		gradientStart: "#dbeafe",
		gradientMiddle: "#cffafe",
		gradientEnd: "#5eead4",
	},
	{
		name: "Hold (Empty)",
		caption:
			"Pause... notice the quiet space before the next breath begins.",
		duration: 6000,
		gradientStart: "#bae6fd",
		gradientMiddle: "#bfdbfe",
		gradientEnd: "#e0e7ff",
	},
	{
		name: "Awareness",
		caption:
			"Shift your attention outward. Feel the air, the sounds, and the rhythm of your body.",
		duration: 15000,
		gradientStart: "#a7f3d0",
		gradientMiddle: "#99f6e4",
		gradientEnd: "#dbeafe",
	},
	{
		name: "Reflection",
		caption:
			"Take a moment to reflect. How do you feel now? More at ease, more present?",
		duration: 15000,
		gradientStart: "#d9f99d",
		gradientMiddle: "#a7f3d0",
		gradientEnd: "#bbf7d0",
	},
	{
		name: "Completion",
		caption:
			"You've completed your mindfulness session. Carry this calm with you throughout the day.",
		duration: 0,
		gradientStart: "#dbeafe",
		gradientMiddle: "#ede9fe",
		gradientEnd: "#fbcfe8",
	},
];

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
	const [phaseIndex, setPhaseIndex] = useState(0);
	const currentPhase = MINDFULNESS_PHASES[phaseIndex];
	const [isPlaying, setIsPlaying] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);
	const [repetitions, setRepetitions] = useState(1);
	const [currentRep, setCurrentRep] = useState(1);
	const remainingTimeRef = useRef(0);
	const currentRepRef = useRef(1);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const intervalRef = useRef<number | null>(null);

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

	const startPhase = (
		index: number,
		startingTime: number,
		startingRep: number
	) => {
		setPhaseIndex(index);
		setTimeLeft(startingTime);
		setTimeout(() => textToSpeech(MINDFULNESS_PHASES[index].caption), 500);
		remainingTimeRef.current = startingTime;
		setCurrentRep(startingRep);
		currentRepRef.current = startingRep;
		intervalRef.current = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
			remainingTimeRef.current--;

			if (remainingTimeRef.current <= 0) {
				if (intervalRef.current) clearInterval(intervalRef.current);

				if (
					index === MINDFULNESS_PHASES.length - 2 &&
					currentRepRef.current < repetitions
				) {
					setCurrentRep((r) => r + 1);
					currentRepRef.current++;
					startPhase(
						1,
						MINDFULNESS_PHASES[1].duration / 1000,
						currentRepRef.current
					);
					return;
				} else if (index < MINDFULNESS_PHASES.length - 1) {
					startPhase(
						index + 1,
						MINDFULNESS_PHASES[index + 1].duration / 1000,
						currentRepRef.current
					);
					return;
				} else {
					setIsPlaying(false);
					setPhaseIndex(MINDFULNESS_PHASES.length - 1);
					setTimeout(() => fadeOutAudio(audioRef.current), 1000);
					return;
				}
			}
		}, 1000);
	};

	const startSession = () => {
		setIsPlaying(true);

		if (audioRef.current) {
			audioRef.current.currentTime = 1.5;
			audioRef.current.volume = 0.8;
			playAudio(audioRef.current);
		}

		startPhase(1, MINDFULNESS_PHASES[1].duration / 1000, 1);
	};

	const stopSession = () => {
		setIsPlaying(false);
		stopSpeech();
		setPhaseIndex(0);
		setCurrentRep(1);
		setRepetitions(1);
		setTimeout(() => pauseAudio(audioRef.current), 500);
		setMindfulness(false)
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	return (
		<div
			className={`fixed ${
				minimized
					? "w-[320px] h-[180px] rounded-xl overflow-hidden shadow-2xl cursor-move"
					: "inset-0 flex justify-center items-center bg-black"
			} transition-all duration-500 ease-in-out`}
			style={
				minimized
					? { left: position.x, bottom: position.y, zIndex: 100 }
					: { zIndex: 100 }
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
								width: 400,
								height: 400,
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
								width: 400,
								height: 400,
								borderRadius: 100,
								top: window.innerHeight / 2 - 150,
								left: window.innerWidth * 0.9 - 400,
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
				<div className="absolute inset-0 z-101 flex flex-col justify-center items-center text-white pointer-events-none">
					{/* Dynamic glowing background */}
					<motion.div
						animate={{
							scale: [1, 1.05, 1],
							opacity: [0.2, 0.6, 0.2],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className={`absolute w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-r ${currentPhase.gradientMiddle} opacity-40`}
					/>
					<div className="relative w-72 h-72 flex items-center justify-center">
						{/* Timer Ring */}
						<svg
							className="absolute w-64 h-64 -rotate-90"
							viewBox="0 0 100 100"
						>
							<circle
								cx="50"
								cy="50"
								r="45"
								stroke="rgba(0,0,0,0.1)"
								strokeWidth="5"
								fill="none"
							/>
							<motion.circle
								cx="50"
								cy="50"
								r="45"
								stroke="url(#grad)"
								strokeWidth="5"
								fill="none"
								strokeLinecap="round"
								animate={{ strokeDashoffset: 0 }}
								initial={{ strokeDashoffset: 283 }}
								transition={{
									duration: currentPhase.duration / 1000,
									ease: "easeInOut",
								}}
								style={{ strokeDasharray: 283 }}
							/>
							<defs>
								<linearGradient
									id="grad"
									x1="0"
									y1="0"
									x2="1"
									y2="1"
								>
									<stop
										offset="0%"
										stopColor={currentPhase.gradientStart}
									/>
									<stop
										offset="100%"
										stopColor={currentPhase.gradientEnd}
									/>
								</linearGradient>
							</defs>
						</svg>

						{/* Core Orb */}
						<motion.div
							animate={{
								scale:
									currentPhase.name === "Inhale"
										? 1.5
										: currentPhase.name === "Exhale"
										? 1
										: 1.25,
								borderRadius: [
									"50% 50% 50% 50%",
									"48% 52% 51% 49%",
									"50% 50% 50% 50%",
								],
								boxShadow: [
									"0 0 40px rgba(56,189,248,0.5)",
									"0 0 60px rgba(45,212,191,0.7)",
									"0 0 40px rgba(56,189,248,0.5)",
								],
							}}
							transition={{
								duration: currentPhase.duration / 1000,
								ease: "easeInOut",
							}}
							className="absolute w-56 h-56 flex items-center justify-center rounded-full"
							style={{
								background: `linear-gradient(135deg, ${currentPhase.gradientStart}, ${currentPhase.gradientEnd})`,
								transition: `background ${
									currentPhase.duration / 1000
								}s ease-in-out`,
							}}
						>
							{/* Inner fluid pulse */}
							<motion.div
								animate={{
									scale: [1, 1.1, 1],
									opacity: [0.6, 1, 0.6],
									borderRadius: [
										"50% 50% 50% 50%",
										"52% 48% 49% 51%",
										"50% 50% 50% 50%",
									],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="w-40 h-40 bg-white/40 blur-lg"
							/>

							{/* Phase Name in the center */}
							<AnimatePresence mode="wait">
								<motion.div
									key={phaseIndex + "-name"}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.4 }}
									className="absolute text-center text-3xl font-semibold text-gray-700"
								>
									{currentPhase.name}
								</motion.div>
							</AnimatePresence>
						</motion.div>
					</div>
					{/* Time left */}
					{isPlaying && !!timeLeft && (
						<AnimatePresence mode="wait">
							<motion.div
								key={phaseIndex + "-time"}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4 }}
								className="text-gray-700 font-medium text-xl mt-14"
							>
								{timeLeft}s
							</motion.div>
						</AnimatePresence>
					)}
					<AnimatePresence mode="wait">
						<motion.p
							key={phaseIndex + "-caption"}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4 }}
							className="text-xl text-gray-600 font-semibold px-4 text-center mt-6"
						>
							{currentPhase.caption}
						</motion.p>
					</AnimatePresence>
					{/* Controls */}
					<div className="flex flex-col items-center gap-4 mt-14 z-10">
						{/* Repetitions Selector */}
						<div className="flex items-center gap-2">
							<label className="text-gray-700 font-medium">
								Repetitions:
							</label>
							<input
								type="number"
								min={1}
								max={10}
								value={repetitions}
								onChange={(e) =>
									setRepetitions(Number(e.target.value))
								}
								className="w-16 text-center border border-gray-300 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
							/>
							{isPlaying && repetitions > 1 && (
								<span className="text-sm text-gray-500">
									({currentRep}/{repetitions})
								</span>
							)}
						</div>

						{/* Play / Pause / Reset Buttons */}
						<div className="flex justify-center gap-4">
							{phaseIndex === 0 ? (
								<button
									onClick={startSession}
									className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-lg hover:from-teal-500 hover:to-teal-600 active:scale-95 transition-all duration-200"
								>
									<IoPlay className="text-lg" /> Start
								</button>
							) : isPlaying ? (
								<button
									onClick={() => {
										setIsPlaying(false);
										stopSpeech();
										setTimeout(
											() => pauseAudio(audioRef.current),
											500
										);
										if (intervalRef.current)
											clearInterval(intervalRef.current);
									}}
									className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-lg hover:from-teal-500 hover:to-teal-600 active:scale-95 transition-all duration-200"
								>
									<IoPause className="text-lg" /> Pause
								</button>
							) : (
								<button
									onClick={() => {
										setIsPlaying(true);
										startPhase(
											phaseIndex,
											timeLeft,
											currentRep
										);
										playAudio(audioRef.current);
									}}
									className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-lg hover:from-teal-500 hover:to-teal-600 active:scale-95 transition-all duration-200"
								>
									<IoPlay className="text-lg" /> Resume
								</button>
							)}
							<button
								onClick={() => {
									setPhaseIndex(0);
									setIsPlaying(false);
									setCurrentRep(1);
									stopSpeech();
									setTimeout(
										() => fadeOutAudio(audioRef.current),
										1000
									);
									if (intervalRef.current)
										clearInterval(intervalRef.current);
								}}
								className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-600 active:scale-95 transition-all duration-200"
							>
								<IoRefresh className="text-lg" /> Reset
							</button>
						</div>
					</div>

					<audio ref={audioRef} loop src="/audio/mindfulness.mp3" />
				</div>
			)}
		</div>
	);
};

export default VideoCall;
