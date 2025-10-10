import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { WBMessage } from "@common/types/wb";
import WBConversationWindow from "./WBConversationWindow";
import wbService from "services/wb";
import websocketService from "utilities/websocket";

interface Prop {
	messages: WBMessage[];
	setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
	loadingWBReply: boolean;
	setLoadingWBReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const Opinion = ({
	messages,
	setMessages,
	loadingWBReply,
	setLoadingWBReply,
}: Prop) => {
	const [question, setQuestion] = useState("");

	const askForOpinion = (question: string) => {
		setLoadingWBReply(true);
		setMessages((prev) => [
			{ role: "user", content: question, timestamp: new Date() },
		]);

		wbService.getUnbiasedOpinion({
			content: question,
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
				Unbiased Opinion
			</h2>

			{
				<div className="bg-white/70 backdrop-blur-md shadow-lg rounded-3xl p-6 flex flex-col gap-6 w-full max-w-250 mb-16">
					<div className="flex items-center gap-3">
						<span className="text-4xl">💬</span>
						<div className="text-2xl font-semibold text-gray-800">
							Ask Your Question
						</div>
					</div>

					{/* Input Field */}
					<div className="flex gap-3 mt-2">
						<input
							type="text"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							placeholder="e.g. Should companies adopt a 4-day work week?"
							className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
						<button
							onClick={() => askForOpinion(question)}
							className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200`}
						>
							<IoSend className="text-lg" />
							Ask
						</button>
					</div>
				</div>
			}
			<div className="flex flex-col gap-6 w-full max-w-250">
				<WBConversationWindow
					messages={messages}
					loadingWBReply={loadingWBReply}
				/>
			</div>
		</>
	);
};

export default Opinion;
