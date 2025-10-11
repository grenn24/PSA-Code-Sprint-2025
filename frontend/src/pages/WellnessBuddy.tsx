import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaHeart,
	FaComments,
	FaBalanceScale,
	FaSpa,
	FaChartLine,
	FaLightbulb,
	FaQuoteLeft,
	FaChevronRight,
} from "react-icons/fa";
import { IoArrowBack, IoArrowUp } from "react-icons/io5";
import { WBConversation, WBMessage } from "@common/types/wb";
import { useAppSelector } from "redux/store";
import userService from "services/user";
import wbService from "services/wb";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import websocketService from "utilities/websocket";
import CountdownButton from "components/CountdownButton";
import MoodChanges from "components/wellnessBuddy/MoodChanges";
import WBConversationWindow from "components/wellnessBuddy/WBConversationWindow";
import WBInput from "components/wellnessBuddy/WBInput";
import UsefulTips from "components/wellnessBuddy/UsefulTips";
import Mindfulness from "components/wellnessBuddy/Mindfulness";
import Opinion from "components/wellnessBuddy/Opinion";
import DailyCheckIn from "components/wellnessBuddy/DailyCheckIn";
import WBDashboard from "components/wellnessBuddy/WBDashboard";

const STARTERS = [
	{
		question: "How do I manage stress during tight deadlines?",
		category: "Work & Productivity",
		input: "Hi Wellness Buddy! I often feel overwhelmed during tight deadlines. Please help me reflect on my workflow, suggest practical strategies to reduce stress, and guide me step by step on prioritizing tasks effectively. Keep the response friendly, brief, and conversational.",
	},
	{
		question: "What can I do to improve my sleep quality?",
		category: "Health & Recovery",
		input: "Hi Wellness Buddy! I've been struggling with sleep lately. Can you provide a personalized routine or tips to improve my sleep quality? Include practical habits and suggestions I can try immediately. Keep your advice concise and actionable.",
	},
	{
		question: "How can I communicate better when I'm upset?",
		category: "Emotional Awareness",
		input: "Hi Wellness Buddy! Sometimes I get upset and struggle to communicate clearly. Can you help me reflect on my emotions and provide a step-by-step approach to express myself calmly and effectively? Keep the tone supportive and friendly.",
	},
	{
		question: "What are small daily habits that improve happiness?",
		category: "Mindfulness & Routine",
		input: "Hi Wellness Buddy! I want to incorporate small habits that boost happiness. Please suggest actionable daily routines, explain why they help, and give me a simple plan to integrate them into my day. Keep the response positive and practical.",
	},
	{
		question: "How can I build resilience in challenging situations?",
		category: "Work & Productivity",
		input: "Hi Wellness Buddy! I often face tough challenges at work and feel discouraged. Can you help me build resilience by reflecting on my current coping strategies and suggesting concrete methods to strengthen my mindset? Provide practical exercises and keep it concise.",
	},
	{
		question: "How do I stay motivated for long-term goals?",
		category: "Mindset & Motivation",
		input: "Hi Wellness Buddy! I struggle to stay motivated for long-term projects. Can you help me reflect on my goals, suggest strategies to maintain motivation over time, and provide a plan I can follow? Make the advice friendly and actionable.",
	},
	{
		question: "How can I manage anxiety during social interactions?",
		category: "Emotional Awareness",
		input: "Hi Wellness Buddy! I get anxious in social situations. Can you guide me on techniques to reduce anxiety, build confidence, and communicate effectively? Provide a step-by-step approach and keep the tone supportive and conversational.",
	},
	{
		question: "How do I maintain a balanced diet with a busy schedule?",
		category: "Health & Recovery",
		input: "Hi Wellness Buddy! I have a busy schedule and struggle to eat healthily. Can you help me reflect on my current eating habits and provide a practical plan to maintain a balanced diet, including meal prep tips or quick meal suggestions? Keep it concise and actionable.",
	},
	{
		question: "How can I better manage my time and priorities?",
		category: "Work & Productivity",
		input: "Hi Wellness Buddy! I often feel like I’m juggling too many tasks. Can you help me analyze my workflow, suggest priority-setting techniques, and provide a clear step-by-step plan to manage my time more effectively? Keep it friendly and brief.",
	},
	{
		question: "How can I practice mindfulness in daily life?",
		category: "Mindfulness & Routine",
		input: "Hi Wellness Buddy! I want to be more mindful and present. Can you suggest specific daily exercises, explain how they improve mindfulness, and provide a simple schedule I can follow? Keep your response concise and easy to implement.",
	},
	{
		question: "How can I improve my career growth and skill development?",
		category: "Career & Growth",
		input: "Hi Wellness Buddy! I want to grow in my career and develop new skills. Can you help me reflect on my current strengths and weaknesses, suggest concrete steps for skill development, and give me a plan for continuous growth? Make it practical and encouraging.",
	},
	{
		question: "How can I build and maintain stronger relationships?",
		category: "Relationships & Social Skills",
		input: "Hi Wellness Buddy! I want to improve my relationships with friends and colleagues. Can you suggest actionable ways to communicate better, strengthen bonds, and handle conflicts gracefully? Keep your response friendly, concise, and easy to follow.",
	},
];

const WellnessBuddy = () => {
	const { user } = useAppSelector((state) => state.user);
	const [input, setInput] = useState("");
	const [tmpInput, setTmpInput] = useState("");
	const [statelessMessages, setStatelessMessages] = useState<WBMessage[]>([]);
	const [count, setCount] = useState<number | null>(null);
	const startersContainerRef = useRef<HTMLDivElement>(null);
	const [usefulTips, setUsefulTips] = useState<
		{ text: string; category: string; image: string }[]
	>([]);
	const [usefulTipIndex, setUsefulTipIndex] = useState(0);
	const [isCreatingConversation, setIsCreatingConversation] = useState(false);
	const [conversations, setConversations] = useState<WBConversation[]>([]);
	const [selectedConversationID, setSelectedConversationID] = useState<
		string | null
	>(null);
	const [selectedFeature, setSelectedFeature] = useState<
		| "moodChanges"
		| "tips"
		| "mindfulness"
		| "opinion"
		| "dailyCheckIn"
		| null
	>(null);
	const selectedConversation = conversations.find(
		(convo) => convo._id === selectedConversationID
	);
	const [loadingWBReply, setLoadingWBReply] = useState(false);
	const [loadingWBEndReply, setLoadingWBEndReply] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const [autoScroll, setAutoScroll] = useState(true);

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

	const handleCreateConversation = async (input: string) => {
		if (!user?._id || !input.trim()) return;
		setTmpInput(input);
		setInput("");
		setIsCreatingConversation(true);
		const userMessage = {
			content: input,
			timestamp: new Date(),
		};
		// create empty conversation
		const conversation = await wbService.createConversation(userMessage);
		setIsCreatingConversation(false);
		setTmpInput("");
		setConversations((prev) => [conversation, ...prev]);
		if (!conversation._id) return;
		setSelectedConversationID(conversation._id);
		handlePostMessage(conversation._id, input);
	};

	const handlePostMessage = async (
		selectedConversationID: string,
		input: string
	) => {
		if (!selectedConversationID || !input.trim()) return;
		setInput("");
		setLoadingWBReply(true);
		setLoadingWBEndReply(true);

		wbService.postMessage(selectedConversationID, {
			content: input,
			timestamp: new Date(),
		});

		setConversations((prev) =>
			prev.map((convo) =>
				convo._id === selectedConversationID
					? {
							...convo,
							messages: [
								...convo.messages,
								{
									role: "user",
									content: input,
									timestamp: new Date(),
								},
								{
									role: "assistant",
									content: "",
									timestamp: new Date(),
								},
							],
					  }
					: convo
			)
		);

		const listener = (message) => {
			if (message.type === "wb_stream_chunk") {
				setLoadingWBReply(false);
				setConversations((prev) =>
					prev.map((convo) => {
						if (convo._id !== selectedConversationID) return convo;
						const messages = [...(convo.messages || [])];
						const lastIndex = messages.length - 1;

						if (
							lastIndex >= 0 &&
							messages[lastIndex].role === "assistant"
						) {
							messages[lastIndex] = {
								...messages[lastIndex],
								content:
									messages[lastIndex].content + message.data,
							};
						}

						return { ...convo, messages };
					})
				);
			}

			if (message.type === "wb_stream_end") {
				websocketService.removeListener(listener);
				setConversations((prev) =>
					prev.map((convo) =>
						convo._id === selectedConversationID
							? message.data
							: convo
					)
				);
				setLoadingWBEndReply(false);
			}
		};

		websocketService.addListener(listener);
		setTimeout(() => websocketService.removeListener(listener), 60000);
	};

	const handleTrackMoodChanges = async (userID: string, input?: string) => {
		setInput("");
		setLoadingWBReply(true);

		if (input) {
			setStatelessMessages((prev) => [
				...prev,
				{ role: "user", content: input, timestamp: new Date() },
			]);
		}

		setStatelessMessages((prev) => [
			...prev,
			{ role: "assistant", content: "", timestamp: new Date() },
		]);

		wbService.trackMoodChanges(
			userID,
			input ? { content: input, timestamp: new Date() } : undefined,
			statelessMessages
		);

		const listener = (message) => {
			if (message.type === "wb_stream_chunk") {
				setLoadingWBReply(false);
				setStatelessMessages((prev) => {
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
				setStatelessMessages((prev) =>
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

	const handleGetUsefulTips = async (userID: string, input?: string) => {
		setInput("");
		setLoadingWBReply(true);
		if (input && !loadingWBReply && !!usefulTips?.[usefulTipIndex]) {
			const systemPrompt = `You are "Wellness Buddy" — a warm, encouraging digital assistant for PSA employees.
				The user has just seen a "Tip of the Moment" suggestion: ${usefulTips?.[usefulTipIndex]?.text}. 
				Now, they may ask follow-up questions, reflections, or request for clarification.
				Your role:
				- Respond conversationally and empathetically, like a supportive colleague. 
				- Encourage healthy habits, focus, and balance at work.
				- If the user asks for advice, tailor your response to the workplace context (e.g., port operations, shift work, teamwork, or mental wellness).
				- Keep your tone light, friendly, and human — you can use emojis sparingly.`;
			setStatelessMessages((prev) => [
				...prev,
				{ role: "user", content: input, timestamp: new Date() },
			]);

			wbService.postMessageStateless(
				{ content: input, timestamp: new Date() },
				statelessMessages,
				systemPrompt
			);

			const listener = (message) => {
				if (message.type === "wb_stream_chunk") {
					setLoadingWBReply(false);
					setStatelessMessages((prev) => {
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
											content:
												hist.content + message.data,
									  }
									: hist
							);
						}
					});
				}

				if (message.type === "wb_stream_end") {
					websocketService.removeListener(listener);
					setStatelessMessages((prev) =>
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
		} else {
			const usefulTips = await wbService.getUsefulTips(userID);
			setUsefulTips(usefulTips);
			setStatelessMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"I hope you found these **Tips of the Moment** helpful! Feel free to ask me for more advice anytime. I'm here to help you stay energised and motivated!",
					timestamp: new Date(),
				},
			]);
			setLoadingWBReply(false);
		}
	};

	const handleUnbiasedOpinionResponse = async (input: string) => {
		setInput("");
		setLoadingWBReply(true);

		setStatelessMessages((prev) => [
			...prev,
			{ role: "user", content: input, timestamp: new Date() },
		]);

		wbService.postMessageStateless(
			{ content: input, timestamp: new Date() },
			statelessMessages
		);

		const listener = (message) => {
			if (message.type === "wb_stream_chunk") {
				setLoadingWBReply(false);
				setStatelessMessages((prev) => {
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
				setStatelessMessages((prev) =>
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

	const handleDailyCheckInResponse = async (input: string) => {
		setInput("");
		setLoadingWBReply(true);

		setStatelessMessages((prev) => [
			...prev,
			{ role: "user", content: input, timestamp: new Date() },
		]);

		wbService.postMessageStateless(
			{ content: input, timestamp: new Date() },
			statelessMessages
		);

		const listener = (message) => {
			if (message.type === "wb_stream_chunk") {
				setLoadingWBReply(false);
				setStatelessMessages((prev) => {
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
				setStatelessMessages((prev) =>
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

	const scrollToBottom = () => {
		const container = messagesContainerRef.current;
		if (!container) return;
		container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
	};

	const EXPLORE = [
		{
			label: "Daily Check-In",
			icon: <FaHeart />,
			gradient: "from-pink-400 to-rose-500",
			value: "dailyCheckIn",
			renderWBInput: () => {
				return statelessMessages.length >= 1;
			},
			onClick: (_userID: string, input?: string) => {
				if (!input) return;
				handleDailyCheckInResponse(input);
			},
		},
		{
			label: "Talk Through Problems",
			icon: <FaComments />,
			gradient: "from-blue-400 to-indigo-500",
			value: "talkThroughProblems",
			renderWBInput: () => false,
		},
		{
			label: "Get an Unbiased Opinion",
			icon: <FaBalanceScale />,
			gradient: "from-green-400 to-emerald-500",
			value: "opinion",
			onClick: (_userID: string, input?: string) => {
				if (!input) return;
				handleUnbiasedOpinionResponse(input);
			},
			renderWBInput: () => statelessMessages.length >= 1,
		},
		{
			label: "Mindfulness",
			icon: <FaSpa />,
			gradient: "from-purple-400 to-violet-500",
			value: "mindfulness",
			renderWBInput: () => false,
		},
		{
			label: "Track Mood Changes",
			icon: <FaChartLine />,
			gradient: "from-yellow-400 to-orange-500",
			value: "moodChanges",
			onClick: (userID: string, input?: string) => {
				handleTrackMoodChanges(userID, input);
			},
			renderWBInput: () => true,
		},
		{
			label: "Useful Tips",
			icon: <FaLightbulb />,
			gradient: "from-teal-400 to-cyan-500",
			value: "tips",
			onClick: (userID: string, input?: string) => {
				handleGetUsefulTips(userID, input);
			},
			renderWBInput: () => statelessMessages.length >= 1,
		},
	];

	useEffect(() => {
		const container = startersContainerRef.current;
		if (!container) return;
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			container.scrollLeft += e.deltaY;
		};
		container.addEventListener("wheel", onWheel, { passive: false });
		return () => container.removeEventListener("wheel", onWheel);
	}, []);

	return (
		<div className="relative h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 text-gray-800">
			<div className="w-full h-full overflow-y-auto p-6">
				<AnimatePresence mode="wait">
					{!selectedConversationID &&
					!isCreatingConversation &&
					!selectedFeature ? (
						<motion.div
							key="welcome"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
							className="flex flex-col gap-10"
						>
							<WBDashboard
								mood="Happy"
								streak={5}
								activities={[
									{
										name: "Morning Meditation",
										duration: "5 min",
										completed: true,
									},
									{
										name: "Hydration Reminder",
										duration: "8 glasses",
										completed: true,
									},
									{
										name: "Evening Walk",
										duration: "20 min",
										completed: false,
									},
									{
										name: "Sleep Log",
										duration: "hours",
										completed: false,
									},
								]}
							/>
							<h1 className="text-4xl font-semibold text-gray-800">
								How are you feeling today, {user?.name}?
							</h1>
							<div className="flex gap-4 overflow-x-auto scrollbar-hide">
								{EXPLORE.map((item, i) => (
									<div
										key={i}
										onClick={() => {
											setSelectedFeature(
												item.value as any
											);
											if (!user?._id) return;
											item.onClick?.(user?._id);
										}}
										className={`min-w-[220px] p-5 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg flex flex-col justify-between cursor-pointer transition-all hover:brightness-95`}
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
							<div className="flex flex-col gap-4  w-full">
								<h2 className="text-xl font-semibold">
									Quick Starters
								</h2>
								<div className="h-24 w-full relative">
									<div
										ref={startersContainerRef}
										className={`flex gap-4 overflow-x-auto scrollbar-hide w-full absolute`}
									>
										{STARTERS.map((s, i) => (
											<div
												key={i}
												onClick={() => {
													setCount(3);
													setInput(s.input);
												}}
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
							</div>
							<div className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									Conversation History
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
											<FaChevronRight
												className="text-gray-700"
												size={16}
											/>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					) : (
						<motion.div
							key="conversation"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4 }}
							className="flex flex-col items-center pb-26 w-full"
						>
							<div className="self-start mb-4">
								<button
									onClick={() => {
										setSelectedConversationID(null);
										setSelectedFeature(null);
										setStatelessMessages([]);
									}}
									className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold"
								>
									<IoArrowBack size={20} />
									Back
								</button>
							</div>
							{(selectedConversation ||
								isCreatingConversation) && (
								<>
									<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12 min-h-[36px]">
										{selectedConversation?.title}
									</h2>
									<div
										ref={messagesContainerRef}
										className="flex flex-col gap-6 w-full max-w-250"
									>
										{isCreatingConversation && (
											<div className="flex justify-end">
												<div className="max-w-[75%] bg-blue-400/60 text-lg px-3 py-2 rounded-2xl rounded-br-none shadow-xs">
													{tmpInput}
												</div>
											</div>
										)}
										<WBConversationWindow
											messages={
												selectedConversation?.messages ||
												[]
											}
											loadingWBReply={loadingWBReply}
										/>
									</div>
								</>
							)}
							{selectedFeature === "moodChanges" && (
								<MoodChanges
									messages={statelessMessages}
									setMessages={setStatelessMessages}
									loadingWBReply={loadingWBReply}
								/>
							)}
							{selectedFeature === "tips" && (
								<UsefulTips
									messages={statelessMessages}
									loadingWBReply={loadingWBReply}
									tips={usefulTips}
									setTips={setUsefulTips}
									index={usefulTipIndex}
									setIndex={setUsefulTipIndex}
								/>
							)}
							{selectedFeature === "mindfulness" && (
								<Mindfulness />
							)}
							{selectedFeature === "opinion" && (
								<Opinion
									messages={statelessMessages}
									setMessages={setStatelessMessages}
									loadingWBReply={loadingWBReply}
									setLoadingWBReply={setLoadingWBReply}
								/>
							)}
							{selectedFeature === "dailyCheckIn" && (
								<DailyCheckIn
									messages={statelessMessages}
									setMessages={setStatelessMessages}
									loadingWBReply={loadingWBReply}
									setLoadingWBReply={setLoadingWBReply}
								/>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<AnimatePresence>
				{(!selectedFeature ||
					!!EXPLORE.find(
						(f) => f.value === selectedFeature
					)?.renderWBInput?.()) && (
					<WBInput
						input={input}
						setInput={setInput}
						onSubmit={() => {
							if (selectedFeature) {
								const feature = EXPLORE.find(
									(f) => f.value === selectedFeature
								);
								if (!feature || !user?._id) return;
								feature?.onClick?.(user?._id, input);
							} else if (!selectedConversationID) {
								handleCreateConversation(input);
							} else {
								handlePostMessage(
									selectedConversationID,
									input
								);
							}
						}}
						countdownCounter={count}
						setCountdownCounter={setCount}
						onCountdownComplete={() => {
							handleCreateConversation(input);
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default WellnessBuddy;
