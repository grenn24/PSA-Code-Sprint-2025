import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoPlay, IoPause, IoRefresh } from "react-icons/io5";
import { stopSpeech, textToSpeech } from "utilities/tts";
import { fadeOutAudio, pauseAudio, playAudio } from "utilities/audio";

const phases = [
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

const Mindfulness = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [phaseIndex, setPhaseIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [repetitions, setRepetitions] = useState(1);
	const [currentRep, setCurrentRep] = useState(1);
	const remainingTimeRef = useRef(0);
	const currentRepRef = useRef(1);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const intervalRef = useRef<number | null>(null);

	const currentPhase = phases[phaseIndex];

	const startPhase = (
		index: number,
		startingTime: number,
		startingRep: number
	) => {
		setPhaseIndex(index);
		setTimeLeft(startingTime);
		setTimeout(() => textToSpeech(phases[index].caption), 500);
		remainingTimeRef.current = startingTime;
		setCurrentRep(startingRep);
		currentRepRef.current = startingRep;
		intervalRef.current = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
			remainingTimeRef.current--;

			if (remainingTimeRef.current <= 0) {
				if (intervalRef.current) clearInterval(intervalRef.current);

				if (
					index === phases.length - 2 &&
					currentRepRef.current < repetitions
				) {
					setCurrentRep((r) => r + 1);
					currentRepRef.current++;
					startPhase(
						1,
						phases[1].duration / 1000,
						currentRepRef.current
					);
					return;
				} else if (index < phases.length - 1) {
					startPhase(
						index + 1,
						phases[index + 1].duration / 1000,
						currentRepRef.current
					);
					return;
				} else {
					setIsPlaying(false);
					setPhaseIndex(phases.length - 1);
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
			audioRef.current.volume = 0.80;
			playAudio(audioRef.current);
		}

		startPhase(1, phases[1].duration / 1000, 1);
	};

	useEffect(() => {
		return () => {
			stopSpeech();
			if (audioRef.current) audioRef.current.pause();
		};
	}, []);

	return (
		<>
			<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12 min-h-[36px]">
				Mindfulness
			</h2>
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
						<linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
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
						onChange={(e) => setRepetitions(Number(e.target.value))}
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
								startPhase(phaseIndex, timeLeft, currentRep);
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
		</>
	);
};

export default Mindfulness;
