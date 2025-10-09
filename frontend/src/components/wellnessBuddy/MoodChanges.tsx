import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Area,
} from "recharts";
import CountdownButton from "components/CountdownButton";
import { WBMessage } from "@common/types/wb";
import websocketService from "utilities/websocket";
import wbService from "services/wb";
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { setUser } from "redux/slices/user";
import dayjs from "dayjs";
import WBConversationWindow from "./WBConversationWindow";

// Generate 12 months of daily data
const generateHeatmapData = () => {
	const start = new Date(new Date().getFullYear(), 0, 1);
	const today = new Date();
	const data: { date: Date; mood: number; day: string; month: string }[] = [];

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
		data.push({
			date: new Date(d),
			mood: Math.floor(Math.random() * 10) + 1,
			day: weekdays[d.getDay()],
			month: months[d.getMonth()],
		});
	}

	return data;
};

const getMoodInfo = (level: number) => {
	if (level >= 8)
		return {
			colour: "#10b981",
			text: "Very Positive 😊",
		};
	if (level >= 6)
		return {
			colour: "#34d399",
			text: "Positive 🙂",
		};
	if (level >= 4)
		return {
			colour: "#fbbf24",
			text: "Neutral 😐",
		};
	if (level >= 2)
		return {
			colour: "#f87171",
			text: "Negative 😞",
		};
	return {
		colour: "#ef4444",
		text: "Very Negative 😢",
	};
};

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const { level, date } = payload[0].payload;
		const { text, colour } = getMoodInfo(level);

		const translucentBg = `${colour}99`;

		return (
			<div
				className="p-3 rounded-lg shadow-md backdrop-blur-md border border-white/30"
				style={{
					backgroundColor: translucentBg,
					color: "#000",
				}}
			>
				<p className="font-semibold text-white">
					{dayjs(date).format("dddd, MMM D")}
				</p>
				<p className="text-white">{text}</p>
			</div>
		);
	}
	return null;
};

const MoodDot = (props: any) => {
	const { cx, cy, payload, r } = props;
	if (cx === null || cy === null) return null;
	return (
		<circle
			cx={cx}
			cy={cy}
			r={r}
			fill={getMoodInfo(payload.level).colour}
			stroke="#fff"
			strokeWidth={2}
		/>
	);
};

const MoodActiveDot = (props: any) => {
	const { cx, cy, payload } = props;
	if (cx === null || cy === null) return null;
	return (
		<circle
			cx={cx}
			cy={cy}
			r={7}
			fill={getMoodInfo(payload.level).colour}
			stroke="#fff"
			strokeWidth={2}
		/>
	);
};

const heatmapData = generateHeatmapData();
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const GRADIENT_ID = "mood-gradient";

interface Prop {
	messages: WBMessage[];
	setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
	loadingWBReply: boolean;
	setLoadingWBReply: React.Dispatch<React.SetStateAction<boolean>>;
}
const MoodChanges = ({
	messages,
	setMessages,
	loadingWBReply,
	setLoadingWBReply,
}: Prop) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [input, setInput] = useState("");

	const getColor = (mood: number) => {
		if (mood <= 3) return "bg-red-400";
		if (mood <= 6) return "bg-yellow-400";
		if (mood <= 8) return "bg-green-400";
		return "bg-green-600";
	};

	const handleTrackMoodChanges = async (userID: string, input?: string) => {
		setInput("");
		setLoadingWBReply(true);

		if (input) {
			setMessages((prev) => [
				...prev,
				{ role: "user", content: input, timestamp: new Date() },
			]);
		}
		setMessages((prev) => [
			...prev,
			{ role: "assistant", content: "", timestamp: new Date() },
		]);

		wbService.trackMoodChanges(
			userID,
			input ? { content: input, timestamp: new Date() } : undefined,
			messages
		);

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

	useEffect(() => {
		if (!user?._id) return;
		userService.getUserByID(user._id).then((fetchedUser) => {
			dispatch(setUser(fetchedUser));
		});
	}, []);
	if (!user) return null;

	return (
		<>
			<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12 min-h-[36px]">
				Mood Changes
			</h2>

			<div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-4 flex flex-col gap-4 w-full max-w-250 mb-8">
				<h3 className="text-xl font-medium text-gray-800">
					Mood Over Time
				</h3>
				<ResponsiveContainer width="100%" height={250}>
					<LineChart
						data={user.moods}
						margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
					>
						<defs>
							<linearGradient
								id={GRADIENT_ID}
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="0%"
									stopColor="#6366f1"
									stopOpacity={0.3}
								/>
								<stop
									offset="100%"
									stopColor="#6366f1"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
						<XAxis
							dataKey="date"
							stroke="#6b7280"
							tickFormatter={(date) =>
								dayjs(date).format("MMM D")
							}
						/>
						<YAxis hide stroke="#6b7280" />
						<Tooltip content={<CustomTooltip />} />
						<Area
							type="monotone"
							dataKey="level"
							stroke="none"
							fill={`url(#${GRADIENT_ID})`}
						/>
						<Line
							type="monotone"
							dataKey="level"
							stroke="#6366f1"
							strokeWidth={3}
							dot={<MoodDot r={5} />}
							activeDot={<MoodActiveDot />}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-4 flex flex-col gap-4 w-full max-w-250 overflow-x-auto mb-16">
				<h3 className="text-xl font-medium text-gray-800">
					Mood Heatmap
				</h3>

				<div className="flex gap-1">
					<div className="flex flex-col mr-2 justify-start gap-1 mt-4">
						{weekdays.map((day) => (
							<div
								key={day}
								className="h-4 w-10 text-xs text-gray-500 flex items-center"
							>
								{day}
							</div>
						))}
					</div>

					<div className="flex-1 overflow-x-auto">
						<div className="flex gap-1 mb-1">
							{months.map((month) => (
								<div
									key={month}
									className="w-4 text-xs text-gray-500 flex justify-center"
								>
									{month}
								</div>
							))}
						</div>
						<div className="flex gap-1 flex-col">
							{weekdays.map((day) => (
								<div key={day} className="flex gap-1">
									{months.map((month) => {
										const cell = heatmapData.find(
											(c) =>
												c.day === day &&
												c.month === month
										);
										return (
											<div
												key={month}
												className={`w-4 h-4 rounded-sm cursor-pointer ${
													cell
														? getColor(cell.mood)
														: "bg-gray-200"
												} transition-transform hover:scale-125`}
												title={`Mood: ${
													cell?.mood ?? "N/A"
												} on ${day}, ${month}`}
											/>
										);
									})}
								</div>
							))}
						</div>
					</div>
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

export default MoodChanges;
