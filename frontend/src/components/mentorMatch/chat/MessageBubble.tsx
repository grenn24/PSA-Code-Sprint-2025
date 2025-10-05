import { Message } from "@common/types/chat";
import dayjs from "dayjs";
import {
	PaperClipIcon,
	LightBulbIcon,
	ClipboardDocumentListIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import FeedbackRequestBubbleContent from "./FeedbackRequestBubbleContent";

interface Prop {
	isSender: boolean;
	message: Message;
	updateMessage: (
		messageID: string,
		data: {
			content: string;
			type?:
				| "text"
				| "file"
				| "tip"
				| "quiz"
				| "poll"
				| "feedback"
				| "feedbackRequest"
				| "question"
				| "moodUpdate"
				| "wellbeingPrompt";
			metadata?: Record<string, any> | undefined;
		}
	) => Promise<void>;
}

const MessageBubble = ({ isSender, message, updateMessage }: Prop) => {
	const renderContent = (message: Message) => {
		switch (message.type) {
			case "file":
				return (
					<BubbleWrapper isSender={isSender} message={message}>
						<div className="flex items-center gap-2">
							<PaperClipIcon className="w-4 h-4" />
							<a
								href={message.metadata?.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 underline break-all"
							>
								{message.metadata?.filename || "Download File"}
							</a>
						</div>
					</BubbleWrapper>
				);

			case "tip":
				return (
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<LightBulbIcon className="w-4 h-4 text-yellow-600" />
							<span className="font-semibold">Quick Tip</span>
						</div>
						<p className="italic">{message.content}</p>
					</div>
				);

			case "quiz":
				return (
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<ClipboardDocumentListIcon className="w-4 h-4 text-indigo-600" />
							<span className="font-semibold">Quiz</span>
						</div>
						<p>{message.content}</p>
						{message.metadata?.options && (
							<ul className="list-disc list-inside text-sm mt-1">
								{message.metadata.options.map(
									(opt: string, i: number) => (
										<li key={i}>{opt}</li>
									)
								)}
							</ul>
						)}
					</div>
				);

			case "poll":
				return (
					<div className="flex flex-col gap-1">
						<div className="font-semibold">
							Poll: {message.content}
						</div>
						{message.metadata?.options?.map(
							(opt: string, i: number) => (
								<button
									key={i}
									className="bg-white/70 hover:bg-white/90 border rounded-lg px-2 py-1 text-sm mt-1 text-left"
								>
									{opt}
								</button>
							)
						)}
					</div>
				);

			case "feedback": {
				const feedbacks = message.metadata?.feedbacks || [];
				return (
					<BubbleWrapper isSender={isSender} message={message}>
						<div className="flex flex-col gap-3 py-1">
							<span className="font-bold text-lg">
								{message.content || "Feedback"}
							</span>
							<div className="flex flex-col gap-3">
								{feedbacks.map((fb) => (
									<div
										key={fb._id}
										className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 bg-white rounded-xl transition"
									>
										<p className="text-gray-800 flex-1 text-sm sm:text-base">
											{fb.message}
										</p>

										<div className="flex gap-1 mt-2 sm:mt-0">
											{[1, 2, 3, 4, 5].map((num) => (
												<span
													key={num}
													className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
														fb.rating &&
														fb.rating >= num
															? `bg-gradient-to-r ${
																	isSender
																		? "from-green-400 to-green-600"
																		: "from-indigo-500 to-purple-500"
															  } text-white shadow`
															: "bg-gray-200 text-gray-600"
													}`}
												>
													{num}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</BubbleWrapper>
				);
			}
			case "feedbackRequest": {
				return (
					<FeedbackRequestBubbleContent
						message={message}
						isSender={isSender}
						updateMessage={updateMessage}
					/>
				);
			}

			case "question":
				return (
					<div className="flex flex-col gap-1">
						<span className="font-semibold text-purple-700">
							Question
						</span>
						<p>{message.content}</p>
					</div>
				);
			case "moodUpdate": {
				const moodColors: Record<string, string> = {
					"😄": "from-yellow-300 to-yellow-500",
					"🙂": "from-green-300 to-green-500",
					"😐": "from-gray-300 to-gray-400",
					"😔": "from-blue-300 to-blue-500",
					"😡": "from-red-400 to-red-600",
					"😴": "from-indigo-300 to-indigo-500",
					"🤩": "from-pink-300 to-pink-500",
					"😱": "from-purple-300 to-purple-500",
				};
				const gradient =
					moodColors[message.metadata?.icon] ||
					"from-gray-300 to-gray-400";

				return (
					<div className="flex flex-col items-end">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r ${gradient} text-white shadow-lg`}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<span className="text-5xl">
								{message.metadata?.icon}
							</span>
							<span className="font-semibold text-white text-md text-center">
								{message.metadata?.mood}
							</span>
							{message.content &&
								message.content !== message.metadata?.mood && (
									<>
										<div className="w-full border-t border-white/40 my-0" />
										<span className="text-white/90 text-sm text-center">
											{message.content}
										</span>
									</>
								)}
						</motion.div>
						<div className="flex items-center gap-1 text-xs text-gray-700 mt-1 mr-2">
							<span>
								{dayjs(message.createdAt).format("h:mm a")}
							</span>
							{isSender && (
								<span
									className={`ml-1 ${
										message.read
											? "text-blue-500"
											: "text-gray-700"
									}`}
								>
									{message.read ? "✓✓" : "✓"}
								</span>
							)}
						</div>
					</div>
				);
			}
			case "wellbeingPrompt":
				return (
					<div className="flex items-center gap-2">
						<HeartIcon className="w-4 h-4 text-red-600" />
						<span>
							{message.content || "How are you feeling today?"}
						</span>
					</div>
				);

			default:
				return (
					<BubbleWrapper isSender={isSender} message={message}>
						<p>{message.content}</p>
					</BubbleWrapper>
				);
		}
	};

	return (
		<div
			key={message._id}
			className={`flex ${isSender ? "justify-end" : "justify-start"}`}
		>
			{renderContent(message)}
		</div>
	);
};

interface BubbleWrapperProp {
	children: ReactNode;
	isSender: boolean;
	message: Message;
}
export const BubbleWrapper = ({
	children,
	isSender,
	message,
}: BubbleWrapperProp) => {
	const baseBubbleStyle = `
		py-1 px-3 rounded-xl max-w-[70%] 
		${
			isSender
				? "bg-green-200/80 text-green-900 rounded-br-none"
				: "bg-gray-200/80 text-gray-800 rounded-bl-none"
		}
	`;

	return (
		<div className={baseBubbleStyle}>
			<div className="flex flex-col items-end gap-1">
				{children}
				<div className="flex items-center gap-1 text-xs text-gray-700 mt-1">
					<span>{dayjs(message.createdAt).format("h:mm a")}</span>
					{isSender && (
						<span
							className={`ml-1 ${
								message.read ? "text-blue-500" : "text-gray-700"
							}`}
						>
							{message.read ? "✓✓" : "✓"}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
