import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { setUser } from "redux/slices/user";
import WBConversationWindow from "./WBConversationWindow";
import { User } from "@common/types/user";
import { WBMessage } from "@common/types/wb";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const GRADIENT_ID = "mood-gradient";

const getMoodInfo = (level: number | undefined) => {
	if (!level) {
		return {
			colour: "#9ca3af",
			text: "No Data",
		};
	}
	return level >= 8
		? { colour: "#10b981", text: "Very Positive 😊" }
		: level >= 6
		? { colour: "#34d399", text: "Positive 🙂" }
		: level >= 4
		? { colour: "#fbbf24", text: "Neutral 😐" }
		: level >= 2
		? { colour: "#f87171", text: "Negative 😞" }
		: { colour: "#ef4444", text: "Very Negative 😢" };
};

const CustomTooltip = ({ active, payload }: any) => {
	if (!active || !payload?.length) return null;
	const { level, date } = payload[0].payload;
	const { text, colour } = getMoodInfo(level);
	return (
		<div
			className="p-3 rounded-lg shadow-md backdrop-blur-md border border-white/30"
			style={{ backgroundColor: `${colour}99`, color: "#000" }}
		>
			<p className="font-semibold text-white">
				{dayjs(date).format("dddd, MMM D")}
			</p>
			<p className="text-white">{text}</p>
		</div>
	);
};

const MoodDot = ({ cx, cy, payload, r }: any) =>
	cx !== null && cy !== null ? (
		<circle
			cx={cx}
			cy={cy}
			r={r}
			fill={getMoodInfo(payload.level).colour}
			stroke="#fff"
			strokeWidth={2}
		/>
	) : null;

const MoodActiveDot = ({ cx, cy, payload }: any) =>
	cx !== null && cy !== null ? (
		<circle
			cx={cx}
			cy={cy}
			r={7}
			fill={getMoodInfo(payload.level).colour}
			stroke="#fff"
			strokeWidth={2}
		/>
	) : null;

interface DayCell {
	date: dayjs.Dayjs;
	mood?: User["moods"][number];
}

interface Props {
	messages: WBMessage[];
	setMessages: React.Dispatch<React.SetStateAction<WBMessage[]>>;
	loadingWBReply: boolean;
}

const MoodChanges = ({ messages, loadingWBReply }: Props) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [hoveredCell, setHoveredCell] = useState<DayCell | null>(null);
	const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		if (user?._id)
			userService
				.getUserByID(user._id)
				.then((fetched) => dispatch(setUser(fetched)));
	}, [user?._id, dispatch]);

	if (!user) return null;

	const startDate = dayjs().subtract(12, "month").startOf("week");
	const allDays: DayCell[] = Array.from(
		{ length: dayjs().diff(startDate, "day") + 1 },
		(_, i) => {
			const day = startDate.add(i, "day");
			const mood = user.moods.find((m) =>
				day.isSame(dayjs(m.date), "day")
			);
			return { date: day, mood };
		}
	);

	const weeks: DayCell[][] = [];
	for (let i = 0; i < allDays.length; i += 7)
		weeks.push(allDays.slice(i, i + 7));

	const monthLabels: Record<number, string> = {};
	weeks.forEach((week, i) => {
		const month = week[0].date.format("MMM");
		if (!Object.values(monthLabels).includes(month)) monthLabels[i] = month;
	});

	return (
		<>
			<h2 className="text-3xl font-semibold text-gray-700 w-full mb-12 min-h-[36px]">
				Mood Changes
			</h2>

			{/* Mood Over Time Line Chart */}
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
							tickFormatter={(d) => dayjs(d).format("MMM D")}
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

			{/* Mood Heatmap */}
			<div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-4 flex flex-col gap-4 w-full max-w-250 overflow-x-auto mb-16">
				<h3 className="text-xl font-medium text-gray-800">
					Mood Heatmap
				</h3>

				<div className="flex flex-col gap-1">
					{/* Month labels */}
					<div className="flex gap-1 ml-12">
						{weeks.map((_, i) => (
							<div
								key={i}
								className="w-4 h-4 flex justify-center text-xs text-gray-500"
							>
								{monthLabels[i] ?? ""}
							</div>
						))}
					</div>

					<div className="flex gap-1">
						{/* Weekday labels */}
						<div className="flex flex-col mr-2 justify-start gap-1">
							{weekdays.map((day) => (
								<div
									key={day}
									className="h-4 w-10 text-xs text-gray-500 flex items-center"
								>
									{day}
								</div>
							))}
						</div>

						{/* Heatmap weeks */}
						<div className="flex gap-1 overflow-x-auto">
							{weeks.map((week, i) => (
								<div key={i} className="flex flex-col gap-1">
									{week.map((cell) => (
										<div
											key={cell.date.unix()}
											className="w-4 h-4 rounded-sm cursor-pointer transition-transform hover:scale-125"
											style={{
												backgroundColor: cell.mood
													? getMoodInfo(
															cell.mood.level
													  ).colour
													: "#e5e7eb",
											}}
											onMouseEnter={(e) => {
												const rect = (
													e.target as HTMLDivElement
												).getBoundingClientRect();
												setTooltipPos({
													x:
														rect.left +
														rect.width / 2,
													y: rect.top,
												});
												setHoveredCell(cell);
											}}
											onMouseLeave={() =>
												setHoveredCell(null)
											}
										/>
									))}
								</div>
							))}

							{/* Tooltip rendered once outside the map */}
						</div>
					</div>
				</div>
			</div>
			{hoveredCell && (
				<div
					className="fixed p-2 rounded-lg shadow-md backdrop-blur-md pointer-events-none z-10"
					style={{
						backgroundColor: `${
							getMoodInfo(hoveredCell.mood?.level).colour
						}99`,
						color: "#000",
						left: tooltipPos.x,
						top: tooltipPos.y - 60,
						transform: "translateX(-50%)",
					}}
				>
					<p className="font-semibold text-white text-sm">
						{dayjs(hoveredCell.mood?.date).format("dddd, MMM D")}
					</p>
					<p className="text-white text-xs">
						{getMoodInfo(hoveredCell.mood?.level).text}
					</p>
				</div>
			)}
			{/* WB Conversation Window */}
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
