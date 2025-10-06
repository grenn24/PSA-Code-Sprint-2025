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
import FeedbackRequestBubbleContent from "./FeedbackMessageBubbleContent";
import { useAppSelector } from "redux/store";
import { User } from "@common/types/user";
import QuizMessageBubbleContent from "./QuizMessageBubbleContent";

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
	const { user } = useAppSelector((state) => state.user);
	const renderContent = (message: Message) => {
		switch (message.type) {
			case "file":
				return (
					<BubbleWrapper isSender={isSender} message={message}>
						<div className="flex flex-col gap-2 p-3 rounded-lg max-w-xs bg-gray-50/40">
							{/* Top row: icon + filename */}
							<div className="flex items-center gap-3">
								<PaperClipIcon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
								<div className="flex flex-col">
									<span className="font-medium text-gray-800 truncate">
										{message.metadata?.filename ||
											"Unknown File"}
									</span>
									<span className="text-sm text-gray-500">
										{message.metadata?.size
											? `${(
													message.metadata.size / 1024
											  ).toFixed(1)} KB`
											: ""}
										{message.metadata?.type
											? ` • ${message.metadata.type}`
											: ""}
									</span>
								</div>
							</div>

							{/* Buttons */}
							<div className="flex gap-2 mt-2">
								<a
									href={message.metadata?.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 text-center bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
								>
									Open
								</a>
								<a
									href={message.metadata?.url}
									download={message.metadata?.filename}
									className="flex-1 text-center bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition text-nowrap"
								>
									Save As
								</a>
							</div>
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
			return <QuizMessageBubbleContent message={message} isSender={isSender} />

			case "poll":
				return (
					<BubbleWrapper isSender={isSender} message={message}>
						<div className="flex flex-col gap-3 min-w-xs w-full">
							<div className="font-bold text-lg text-gray-800">
								{message.content || "Untitled Poll"}
							</div>
							<div className="flex flex-col">
								{message.metadata?.options?.map(
									(
										opt: { label: string; voters: User[] },
										i: number
									) => {
										const hasVoted = opt.voters?.some(
											(voter) => voter._id === user?._id
										);
										const proportion =
											opt.voters?.length === 0
												? 0
												: opt.voters?.length /
												  message.metadata.options?.flatMap(
														(o) => o.voters
												  ).length;

										const handleVoteChange = (
											vote: boolean
										) => {
											if (!message._id) return;
											if (vote) {
												updateMessage(message._id, {
													type: "poll",
													content: message.content,
													metadata: {
														...message.metadata,
														options:
															message.metadata.options.map(
																(
																	option,
																	index
																) => {
																	if (
																		index ===
																		i
																	) {
																		return {
																			...option,
																			voters: [
																				...option.voters,
																				user,
																			],
																		};
																	} else if (
																		!message
																			.metadata
																			?.allowMultiple
																	) {
																		return {
																			...option,
																			voters: option.voters?.filter(
																				(
																					voter
																				) =>
																					voter._id !==
																					user?._id
																			),
																		};
																	} else {
																		return option;
																	}
																}
															),
													},
												});
											} else {
												updateMessage(message._id, {
													type: "poll",
													content: message.content,
													metadata: {
														...message.metadata,
														options:
															message.metadata.options.map(
																(
																	option,
																	index
																) => {
																	if (
																		index ===
																		i
																	) {
																		return {
																			...option,
																			voters: option.voters.filter(
																				(
																					voter
																				) =>
																					voter._id !==
																					user?._id
																			),
																		};
																	} else {
																		return option;
																	}
																}
															),
													},
												});
											}
										};
										return (
											<div
												key={i}
												className="relative flex flex-col gap-1 backdrop-blur-md border-gray-200 rounded-xl px-3 py-2 transition"
											>
												<div className="flex items-center justify-between">
													<div className="relative flex gap-2">
														<div className="relative">
															<input
																type="checkbox"
																checked={
																	hasVoted
																}
																onChange={(e) =>
																	handleVoteChange(
																		e.target
																			.checked
																	)
																}
																className={`
																	appearance-none 
																	w-5 h-5 
																	rounded-full 
																	border border-gray-300 
																	cursor-pointer 
																	transition-all duration-300
																	${
																		hasVoted
																			? "bg-gradient-to-br from-purple-500 to-indigo-500 border-none"
																			: "bg-gray-200 hover:bg-gray-300"
																	}
																`}
															/>
															{hasVoted && (
																<svg
																	className="absolute inset-0 m-auto w-4 h-4 text-white pointer-events-none"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth={
																		3
																	}
																	viewBox="0 0 26 26"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M5 13l4 4L19 7"
																	/>
																</svg>
															)}
														</div>

														<span>{opt.label}</span>
													</div>

													<div className="flex items-center gap-2">
														<div className="flex -space-x-2">
															{opt.voters
																?.slice(0, 3)
																.map(
																	(
																		user: any,
																		idx: number
																	) => (
																		<img
																			key={
																				idx
																			}
																			src={
																				user.avatar
																			}
																			alt="voter"
																			className="w-6 h-6 rounded-full border-1 border-white dark:border-gray-800"
																		/>
																	)
																)}
															{opt.voters
																?.length >
																3 && (
																<div className="w-5 h-5 rounded-full bg-gray-300 text-[10px] flex items-center justify-center text-gray-700 border-2 border-white dark:border-gray-800">
																	+
																	{opt.voters
																		?.length -
																		3}
																</div>
															)}
														</div>
														<span className="text-gray-600 text-sm">
															{opt.voters?.length}
														</span>
													</div>
												</div>

												{/* Proportion Bar */}
												<div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mt-1">
													<div
														className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
														style={{
															width: `${
																proportion * 100
															}%`,
														}}
													></div>
												</div>
											</div>
										);
									}
								)}
							</div>

							{/* ℹ️ Allow multiple note */}
							{message.metadata?.allowMultiple && (
								<div className="text-sm text-gray-500">
									Multiple selections allowed
								</div>
							)}
						</div>
					</BubbleWrapper>
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
								{feedbacks.map((fb, index) => (
									<div
										key={fb.message + index}
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
			<div className="flex flex-col items-end">
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
