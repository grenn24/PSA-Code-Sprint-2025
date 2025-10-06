import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaHeart,
	FaComments,
	FaBalanceScale,
	FaSpa,
	FaChartLine,
	FaLightbulb,
	FaQuoteLeft,
} from "react-icons/fa";
import { IoArrowForward, IoArrowUp, IoSend } from "react-icons/io5";

const WellnessBuddy = () => {
	const [input, setInput] = useState("");
	const [chatMode, setChatMode] = useState(false);

	const features = [
		{
			label: "Daily Check-In",
			icon: <FaHeart className="text-white text-3xl" />,
			gradient: "from-pink-400 to-rose-500",
		},
		{
			label: "Talk Through Your Problems",
			icon: <FaComments className="text-white text-3xl" />,
			gradient: "from-blue-400 to-indigo-500",
		},
		{
			label: "Get an Unbiased Opinion",
			icon: <FaBalanceScale className="text-white text-3xl" />,
			gradient: "from-green-400 to-emerald-500",
		},
		{
			label: "Mindfulness",
			icon: <FaSpa className="text-white text-3xl" />,
			gradient: "from-purple-400 to-violet-500",
		},
		{
			label: "Track Mood Changes",
			icon: <FaChartLine className="text-white text-3xl" />,
			gradient: "from-yellow-400 to-orange-500",
		},
		{
			label: "Useful Tips",
			icon: <FaLightbulb className="text-white text-3xl" />,
			gradient: "from-teal-400 to-cyan-500",
		},
	];

	const starters = [
		{
			question: "How do I manage stress during tight deadlines?",
			category: "Work & Productivity",
		},
		{
			question: "What can I do to improve my sleep quality?",
			category: "Health & Recovery",
		},
		{
			question: "How can I communicate better when I'm upset?",
			category: "Emotional Awareness",
		},
		{
			question: "What are small daily habits that improve happiness?",
			category: "Mindfulness & Routine",
		},
	];

	const history = [
		{ title: "Daily Check-In", date: "Oct 5" },
		{ title: "Mindfulness", date: "Oct 4" },
		{ title: "Talk Through Your Problems", date: "Oct 3" },
		{ title: "Useful Tips", date: "Oct 2" },
	];
	return (
		<div className="relative h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 text-gray-800">
			<div className="h-full overflow-y-auto p-6">
				<AnimatePresence>
					{!chatMode && (
						<motion.div
							initial={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.5 }}
							className="flex flex-col gap-8"
						>
							<h1 className="text-4xl font-semibold text-gray-800">
								Listen. Reflect. Recharge.
							</h1>
							<input
								type="text"
								placeholder="Search wellness topics, exercises, or questions"
								className="w-full p-4 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
							/>
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									Explore
								</h2>
								<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
									{features.map((item, i) => (
										<div
											key={i}
											className={`min-w-[220px] p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg flex flex-col justify-between cursor-pointer transition-colors duration-200 hover:brightness-95`}
										>
											<div className="mb-3">
												{item.icon}
											</div>
											<div className="font-semibold text-lg leading-snug">
												{item.label}
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									Starters
								</h2>
								<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
									{starters.map((s, i) => (
										<div
											key={i}
											className="min-w-[300px] p-4 bg-white/80 backdrop-blur-md rounded-2xl border-1 border-gray-300 flex flex-col justify-between cursor-pointer transition-colors duration-200 hover:brightness-98"
										>
											<div className="flex items-center gap-4 mb-2">
												<FaQuoteLeft className="text-blue-500 mt-1 text-2xl" />
												<p className="text-gray-700 font-medium leading-snug">
													{s.question}
												</p>
											</div>
											<p className="text-sm text-gray-500">
												{s.category}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									History
								</h2>
								<div className="flex flex-col gap-3">
									{history.map((h, i) => (
										<div
											key={i}
											className="w-full p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-xs text-gray-700 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:brightness-98"
										>
											<div>
												<p className="font-semibold">
													{h.title}
												</p>
												<p className="text-sm text-gray-500">
													{h.date}
												</p>
											</div>
											<IoArrowForward
												className="text-gray-500"
												size={20}
											/>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<motion.div
				initial={{ y: 80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[70%]"
			>
				<div className="relative flex items-center border-1 border-gray-200 bg-white/40 backdrop-blur-2xl shadow-lg  rounded-2xl px-4 py-2 h-14 transition-all duration-300">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && input.trim()) {
								setChatMode(true);
							}
						}}
						placeholder="Type your thoughts..."
						className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
					/>

					<AnimatePresence>
						{input.trim() && (
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								onClick={() => setChatMode(true)}
								className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-200"
							>
								<IoArrowUp size={18} />
							</motion.button>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	);
};

export default WellnessBuddy;
