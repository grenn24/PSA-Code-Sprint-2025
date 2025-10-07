import React, { useEffect, useState } from "react";
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
import { IoArrowForward, IoArrowUp } from "react-icons/io5";
import { WBConversation } from "@common/types/wb";
import { useAppSelector } from "redux/store";
import userService from "services/user";
import wbService from "services/wb";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";

const WellnessBuddy = () => {
	const { user } = useAppSelector((state) => state.user);
	const [input, setInput] = useState("");
	const [conversations, setConversations] = useState<WBConversation[]>([]);
	const [selectedConversationID, setSelectedConversationID] = useState<
		string | null
	>(null);
	const selectedConversation = conversations.find(
		(convo) => convo._id === selectedConversationID
	);
	const [loadingWBReply, setLoadingWBReply] = useState(false);

	useEffect(() => {
		if (!user?._id) return;
		userService
			.getConversations(user._id)
			.then((conversations) =>
				setConversations(
					conversations.sort(
						(a, b) =>
							dayjs(b.updatedAt).unix() -
							dayjs(a.updatedAt).unix()
					)
				)
			);
	}, [user]);

	const handleCreateConversation = async () => {
		if (!user?._id || !input.trim()) return;
		const userMessage = {
			content: input,
			timestamp: new Date(),
		};
		// create empty conversation
		const conversation = await wbService.createConversation(userMessage);
		setConversations((prev) => [
			...prev,
			{
				...conversation,
				messages: [{ role: "user", ...userMessage }],
			},
		]);
		setInput("");
		if (!conversation._id) return;
		setSelectedConversationID(conversation._id);

		// Get the reply
		setLoadingWBReply(true);
		const updatedConversation = await wbService.postMessage(
			conversation._id,
			userMessage
		);
		setConversations((conversations) =>
			conversations.map((convo) => {
				if (convo._id === conversation._id) {
					return updatedConversation;
				}
				return convo;
			})
		);
		setLoadingWBReply(false);
	};

	const handlePostMessage = async () => {
		if (!selectedConversationID || !input.trim()) return;
		setInput("");
		setLoadingWBReply(true);
		const updatedConversation = await wbService.postMessage(
			selectedConversationID,
			{
				content: input,
				timestamp: new Date(),
			}
		);
		setConversations(
			conversations.map((convo) => {
				if (convo._id === selectedConversationID) {
					return updatedConversation;
				}
				return convo;
			})
		);
		setLoadingWBReply(false);
	};

	const features = [
		{
			label: "Daily Check-In",
			icon: <FaHeart />,
			gradient: "from-pink-400 to-rose-500",
		},
		{
			label: "Talk Through Problems",
			icon: <FaComments />,
			gradient: "from-blue-400 to-indigo-500",
		},
		{
			label: "Get an Unbiased Opinion",
			icon: <FaBalanceScale />,
			gradient: "from-green-400 to-emerald-500",
		},
		{
			label: "Mindfulness",
			icon: <FaSpa />,
			gradient: "from-purple-400 to-violet-500",
		},
		{
			label: "Track Mood Changes",
			icon: <FaChartLine />,
			gradient: "from-yellow-400 to-orange-500",
		},
		{
			label: "Useful Tips",
			icon: <FaLightbulb />,
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

	return (
		<div className="relative h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 text-gray-800">
			<div className="h-full overflow-y-auto p-6">
				<AnimatePresence>
					{!selectedConversationID && (
						<motion.div
							initial={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.5 }}
							className="flex flex-col gap-8"
						>
							<h1 className="text-4xl font-semibold text-gray-800">
								Listen. Reflect. Recharge.
							</h1>

							{/* Search */}
							<input
								type="text"
								placeholder="Search wellness topics, exercises, or questions"
								className="w-full p-4 rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
							/>

							{/* Explore */}
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									Explore
								</h2>
								<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
									{features.map((item, i) => (
										<div
											key={i}
											className={`min-w-[220px] p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg flex flex-col justify-between cursor-pointer transition-all hover:brightness-95`}
										>
											<div className="mb-3 text-3xl">
												{item.icon}
											</div>
											<div className="font-semibold text-lg">
												{item.label}
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Starters */}
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									Starters
								</h2>
								<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
									{starters.map((s, i) => (
										<div
											key={i}
											className="min-w-[300px] p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-300 flex flex-col justify-between cursor-pointer hover:brightness-98"
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

							{/* History */}
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									History
								</h2>
								<div className="flex flex-col gap-3">
									{conversations.map((h, i) => (
										<div
											key={i}
											onClick={() => {
												if (!h._id) return;
												setSelectedConversationID(
													h._id
												);
											}}
											className="w-full p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-sm text-gray-700 flex items-center justify-between cursor-pointer hover:brightness-98"
										>
											<div>
												<p className="font-semibold">
													{h.title}
												</p>
												<p className="text-sm text-gray-500">
													{dayjs(
														h.createdAt
													).fromNow()}
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

					{selectedConversationID && (
						<motion.div
							key="conversation"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="flex flex-col items-center pb-20"
						>
							<>
								<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12">
									{selectedConversation?.title}
								</h2>

								<div className="flex flex-col gap-6 w-full max-w-250">
									{selectedConversation?.messages?.map(
										(msg, i) => (
											<div key={i}>
												{msg.role === "assistant" ? (
													<div className="w-full text-lg font-normal text-gray-800">
														<ReactMarkdown>
															{msg.content}
														</ReactMarkdown>
													</div>
												) : (
													<div className="flex justify-end">
														<div className="max-w-[75%] bg-blue-300/60 text-lg px-3 py-2 rounded-2xl rounded-br-none shadow-xs">
															{msg.content}
														</div>
													</div>
												)}
											</div>
										)
									)}
									{loadingWBReply && (
										<div className="flex justify-start w-full mt-2 ml-2">
											<motion.div
												className="w-3 h-3 bg-blue-500 rounded-full"
												animate={{
													opacity: [1, 0.3, 1],
												}}
												transition={{
													repeat: Infinity,
													duration: 1,
													ease: "easeInOut",
												}}
											/>
										</div>
									)}
								</div>
							</>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<motion.div
				initial={{ y: 80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="absolute bottom-8 w-full px-8 flex justify-center"
			>
				<div className="relative flex items-center border border-gray-200 bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl px-4 py-2 h-14 w-full max-w-300">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && input.trim()) {
								if (!selectedConversationID) {
									handleCreateConversation();
								} else {
									handlePostMessage();
								}
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
								onClick={() => {
									if (!selectedConversationID) {
										handleCreateConversation();
									} else {
										handlePostMessage();
									}
								}}
								className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md"
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
