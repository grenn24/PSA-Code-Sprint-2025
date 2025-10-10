import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend } from "react-icons/io5";
import { WBMessage } from "@common/types/wb";
import wbService from "services/wb";
import websocketService from "utilities/websocket";
import WBConversationWindow from "./WBConversationWindow";

interface Props {
	messages: WBMessage[];
	setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
	loadingWBReply: boolean;
	setLoadingWBReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const MOODS = [
	{
		emoji: "😊",
		value: "Happy",
	},
	{
		emoji: "😐",
		value: "Okay",
	},
	{
		emoji: "😞",
		value: "Sad",
	},
	{
		emoji: "😤",
		value: "Stressed",
	},
	{
		emoji: "😴",
		value: "Tired",
	},
	{
		emoji: "🤩",
		value: "Excited",
	},
];

const DailyCheckIn = ({
	messages,
	setMessages,
	loadingWBReply,
	setLoadingWBReply,
}: Props) => {
	const handleMoodSelect = (moodvalue: string) => {
		const mood = MOODS.find((m) => m.value === moodvalue);
		if (!mood) return;
        setLoadingWBReply(true);
		setMessages((prevMessages) => [
			...prevMessages,
			{
				role: "user",
				content: mood.emoji,
				timestamp: new Date(),
			},
		]);

		wbService.dailyCheckIn({
			content: `${mood.emoji} ${mood.value}`,
			timestamp: new Date(),
		});

		const listener = (message) => {
			if (message.type === "wb_stream_chunk") {
				setLoadingWBReply(false);
				setMessages((prev) => {
					const last = prev[prev.length - 1];
					if (last.role !== "assistant") {
						return [
							...prev,
							{
								role: "assistant",
								content: message.data,
								timestamp: new Date(),
							},
						];
					} else {
						return prev.map((hist, index) =>
							index === prev.length - 1
								? {
										...hist,
										content: hist.content + message.data,
								  }
								: hist
						);
					}
				});
			}

			if (message.type === "wb_stream_end") {
				websocketService.removeListener(listener);
				setMessages((prev) =>
					prev.map((hist, index) => {
						if (
							index === prev.length - 1 &&
							hist.role === "assistant"
						) {
							return {
								...hist,
								content: message.data,
							};
						}
						return hist;
					})
				);
			}
		};

		websocketService.addListener(listener);
		setTimeout(() => websocketService.removeListener(listener), 60000);
	};

	return (
		<>
			<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12 min-h-[36px]">
				Daily Check-In
			</h2>

			{messages.length === 0 && (
				<>
					<p className="text-gray-800 text-xl md:text-2xl text-center font-semibold">
						How are you feeling today?
					</p>

					<div className="grid grid-cols-3 grid-rows-2 gap-8 justify-items-center items-center">
						{MOODS.map((mood) => (
							<motion.button
								key={mood.value}
								onClick={() => handleMoodSelect(mood.value)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`
                                        text-6xl md:text-7xl transition-transform p-5 rounded-full
                                        backdrop-blur-xl bg-white/30 border border-white/25
                                        shadow-lg
                                        flex items-center justify-center
                                    `}
							>
								{mood.emoji}
							</motion.button>
						))}
					</div>
				</>
			)}
			<div className="flex flex-col gap-6 w-full max-w-250">
				<WBConversationWindow
					messages={messages}
					loadingWBReply={loadingWBReply}
				/>
			</div>
		</>
	);
};

export default DailyCheckIn;
