import React, { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import WBConversationWindow from "./WBConversationWindow";
import { WBMessage } from "@common/types/wb";
import { motion, AnimatePresence } from "framer-motion";

interface Tip {
	text: string;
	category?: string;
	image?: string;
}

interface Props {
	messages: WBMessage[];
	loadingWBReply: boolean;
	tips: Tip[];
	setTips: React.Dispatch<React.SetStateAction<Tip[]>>;
	index: number;
	setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const UsefulTips = ({ messages, loadingWBReply, tips, setTips, index, setIndex }: Props) => {

	const showNextTip = () => setIndex((prev) => (prev + 1) % tips.length);
	const currentTip = tips[index];

	return (
		<>
			<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12 min-h-[36px]">
				Useful Tips
			</h2>

			<div className="bg-white/50 backdrop-blur-lg shadow-2xl rounded-3xl p-6 flex flex-col gap-4 w-full max-w-250 mb-16">
				<div className="flex items-center gap-3">
					<span className="text-4xl">💡</span>
					<div className="text-2xl font-semibold text-gray-800">
						Tip of the Moment
					</div>
				</div>

				<div className="p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/80 rounded-2xl flex flex-col gap-3 shadow-inner min-h-[200px] overflow-hidden">
					{loadingWBReply || !currentTip ? (
						<div className="animate-pulse flex flex-col gap-3">
							<div className="w-full h-36 md:h-40 bg-gray-300 rounded-2xl" />
							<div className="h-6 bg-gray-300 rounded-md w-3/4" />
							<div className="h-5 bg-gray-300 rounded-full w-1/4" />
							<div className="h-10 w-32 bg-gray-300 rounded-full mt-2" />
						</div>
					) : (
						<AnimatePresence mode="wait">
							<motion.div
								key={index}
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.4 }}
								className="flex flex-col gap-3"
							>
								{currentTip.image && (
									<img
										src={currentTip.image}
										alt="Tip Illustration"
										className="w-full h-36 md:h-40 object-cover rounded-2xl shadow-sm"
									/>
								)}
								<p className="text-gray-900 text-lg leading-relaxed">
									{currentTip.text}
								</p>
								{currentTip.category && (
									<span className="inline-block bg-blue-100/70 text-blue-700 text-md font-medium px-3 py-1 rounded-full self-start">
										{currentTip.category}
									</span>
								)}
								<div className="flex gap-2 mt-3">
									<button
										className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors shadow-md"
										onClick={showNextTip}
									>
										<span>Next Tip</span>
										<IoRefresh className="text-lg" />
									</button>
								</div>
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-6 w-full max-w-250">
				<WBConversationWindow
					messages={messages}
					loadingWBReply={loadingWBReply}
				/>
			</div>
		</>
	);
};

export default UsefulTips;
