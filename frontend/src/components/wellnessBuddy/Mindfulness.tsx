import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoPlay, IoPause, IoRefresh } from "react-icons/io5";
import { textToSpeech } from "utilities/tts";

const phases = [
	{
		name: "Welcome",
		caption: "Welcome to your Mindfulness Meditation. Let's settle in.",
		duration: 5000, // 5s for settling
		gradient: "from-sky-100 via-blue-200 to-indigo-100",
	},
	{
		name: "Inhale",
		caption:
			"Take a deep breath... let the air fill your lungs and calm your mind.",
		duration: 6000,
		gradient: "from-green-200 via-teal-300 to-blue-200",
	},
	{
		name: "Hold (Full)",
		caption:
			"Hold gently... feel the stillness and the weight of the present moment.",
		duration: 4000,
		gradient: "from-blue-200 via-indigo-200 to-teal-100",
	},
	{
		name: "Exhale",
		caption:
			"Exhale slowly... release tension and let go of what you no longer need.",
		duration: 6000,
		gradient: "from-blue-100 via-cyan-200 to-teal-300",
	},
	{
		name: "Hold (Empty)",
		caption:
			"Pause... notice the quiet space before the next breath begins.",
		duration: 4000,
		gradient: "from-sky-100 via-blue-200 to-indigo-100",
	},
	{
		name: "Awareness",
		caption:
			"Shift your attention outward — feel the air, the sounds, and the rhythm of your body.",
		duration: 8000,
		gradient: "from-emerald-200 via-teal-200 to-blue-100",
	},
	{
		name: "Reflection",
		caption:
			"Take a moment to reflect. How do you feel now? More at ease, more present?",
		duration: 7000,
		gradient: "from-teal-100 via-emerald-200 to-green-200",
	},
	{
		name: "Completion",
		caption:
			"You've completed your mindfulness session. Carry this calm with you throughout the day 🌿",
		duration: 5000,
		gradient: "from-blue-100 via-purple-100 to-pink-100",
	},
];

const Mindfulness = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [phaseIndex, setPhaseIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const timeLeftIntervalRef = useRef<number | null>(null);

	const currentPhase = phases[phaseIndex];

	const startSession = () => {
		setIsPlaying(true);
		if (audioRef.current) {
			audioRef.current.currentTime = 1;
			audioRef.current.volume = 0.45;
			audioRef.current.play();
		}

		setPhaseIndex(1);
		setTimeLeft(phases[1].duration / 1000);
		setTimeout(() => textToSpeech(phases[1].caption), 1000);

		if (timeLeftIntervalRef.current)
			clearInterval(timeLeftIntervalRef.current);

		timeLeftIntervalRef.current = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 0) {
					setPhaseIndex((prevIndex) => {
						if (prevIndex === phases.length - 2) {
							setIsPlaying(false);
							if (timeLeftIntervalRef.current)
								clearInterval(timeLeftIntervalRef.current);
							if (audioRef.current) audioRef.current.pause();
							return prevIndex + 1;
						}
                        const nextIndex = prevIndex + 1;
						setTimeLeft(phases[nextIndex].duration / 1000);
						setTimeout(
							() => textToSpeech(phases[nextIndex].caption),
							1000
						);
						return nextIndex;
					});
					return (
						phases[phaseIndex + 1].duration / 1000
					);
				}
				return prev - 1;
			});
		}, 1000);
	};

	useEffect(() => {
		return () => {
			if (timeLeftIntervalRef.current)
				clearInterval(timeLeftIntervalRef.current);
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
				className={`absolute w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-r ${currentPhase.gradient} opacity-40`}
			/>

			<div className="relative flex flex-col items-center justify-center gap-16 w-full max-w-xl overflow-hidden">
				<AnimatePresence mode="sync">
					<motion.div
						key={phaseIndex}
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 5 }}
						transition={{ duration: 0.4 }}
						className="relative w-full text-center text-2xl font-semibold text-gray-700"
					>
						{currentPhase.name}
					</motion.div>
				</AnimatePresence>
				<div className="relative w-72 h-72 flex items-center justify-center">
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
							animate={{ strokeDashoffset: [283, 0] }}
							transition={{
								duration: currentPhase.duration / 1000,
								ease: "easeInOut",
							}}
							style={{
								strokeDasharray: 283,
								strokeDashoffset: 283,
							}}
						/>
						<defs>
							<linearGradient
								id="grad"
								x1="0"
								y1="0"
								x2="1"
								y2="1"
							>
								<stop offset="0%" stopColor="#5EEAD4" />
								<stop offset="100%" stopColor="#3B82F6" />
							</linearGradient>
						</defs>
					</svg>

					{/* Core Orb */}
					<motion.div
						animate={{
							scale:
								currentPhase.name === "Inhale"
									? [1, 1.5]
									: currentPhase.name === "Exhale"
									? [1.5, 1]
									: 1.5,
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
						className={`absolute w-56 h-56 rounded-full bg-gradient-to-r ${currentPhase.gradient} flex items-center justify-center`}
					>
						<motion.div
							animate={{
								scale: [1, 1.1, 1],
								opacity: [0.6, 1, 0.6],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="w-40 h-40 rounded-full bg-white/40 blur-lg"
						/>
					</motion.div>
				</div>

				{/* Time left */}
				{isPlaying && (
					<AnimatePresence mode="sync">
						<motion.div
							key={phaseIndex}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4 }}
							className="bottom-28 text-gray-700 font-medium text-lg"
						>
							{timeLeft}s left
						</motion.div>
					</AnimatePresence>
				)}

				{/* Phase caption */}
				<AnimatePresence mode="sync">
					<motion.p
						key={phaseIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
						className="bottom-14 text-lg text-gray-600 font-semibold px-4 text-center"
					>
						{currentPhase.caption}
					</motion.p>
				</AnimatePresence>
			</div>

			{/* Controls */}
			<div className="flex justify-center gap-3 mt-8">
				{!isPlaying ? (
					<button
						onClick={startSession}
						className="flex items-center gap-2 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors shadow-md"
					>
						<IoPlay className="text-lg" /> Start
					</button>
				) : (
					<button
						onClick={() => setIsPlaying(false)}
						className="flex items-center gap-2 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors shadow-md"
					>
						<IoPause className="text-lg" /> Pause
					</button>
				)}
				<button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors shadow-md">
					<IoRefresh className="text-lg" /> Reset
				</button>
			</div>

			<audio ref={audioRef} loop src="/audio/mindfulness.mp3" />
		</>
	);
};

export default Mindfulness;
