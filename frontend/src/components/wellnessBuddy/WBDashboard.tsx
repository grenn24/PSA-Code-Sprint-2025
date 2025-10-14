import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "redux/store";
import { getMoodInfo } from "./MoodChanges";
import userService from "services/user";
import { setUser } from "redux/slices/user";
import {
	Smile,
	Brain,
	MessageSquare,
	Video,
	CheckCircle2,
	Circle,
	Lightbulb,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip as RechartTooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const QUICK_TIPS = [
	"Take a short walk after lunch to refresh your mind.",
	"Practice deep breathing for 2 minutes when feeling tense.",
	"Write down one thing you're grateful for today.",
	"Disconnect from screens for 15 minutes every few hours.",
	"Reach out to a teammate for a quick chat to de-stress.",
];

const WBDashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!user?._id) return;
		userService.getUserByID(user._id).then((res) => dispatch(setUser(res)));
	}, []);

	const todayMoods =
		user?.moods.filter((m) => dayjs(m.date).isSame(dayjs(), "day")) || [];
	const moodInfo =
		todayMoods.length === 0
			? getMoodInfo(undefined)
			: getMoodInfo(
					todayMoods.reduce((a, b) => a + b.level, 0) /
						todayMoods.length
			  );

	const randomTip = useMemo(
		() => QUICK_TIPS[Math.floor(Math.random() * QUICK_TIPS.length)],
		[]
	);

	const moodsThisWeek = Array.from({ length: 7 }, (_, i) => {
		const date = dayjs().startOf("week").add(i, "day");
		const moodLevel = user?.moods.find((m) =>
			dayjs(m.date).isSame(date, "day")
		)?.level;
		return {
			day: date.format("ddd"),
			mood: moodLevel,
			isToday: date.isSame(dayjs(), "day"),
		};
	});

	const activities = [
		{
			name: "Completed daily check-in",
			icon: <Smile className="text-indigo-500" />,
			completed: user?.activities.some(
				(activity) =>
					dayjs(activity.date).isSame(dayjs(), "day") &&
					activity.type === "dailyCheckIn"
			),
		},
		{
			name: `Completed 2 mindfulness sessions (${
				(user?.activities || []).filter(
					(activity) =>
						dayjs(activity.date).isSame(dayjs(), "day") &&
						activity.type === "mindfulness"
				).length
			}/2)`,
			icon: <Brain className="text-purple-500" />,
			completed:
				(user?.activities || []).filter(
					(activity) =>
						dayjs(activity.date).isSame(dayjs(), "day") &&
						activity.type === "mindfulness"
				).length >= 2,
		},
		{
			name: "Sent a message to your mentor",
			icon: <MessageSquare className="text-green-500" />,
			completed: user?.activities.some(
				(activity) =>
					dayjs(activity.date).isSame(dayjs(), "day") &&
					activity.type === "mentorMessage"
			),
		},
		{
			name: "Finished a video call with your mentor",
			icon: <Video className="text-blue-500" />,
			completed: user?.activities.some(
				(activity) =>
					dayjs(activity.date).isSame(dayjs(), "day") &&
					activity.type === "mentorVideoCall"
			),
		},
	];
	const completedActivitiesCount = activities.filter(
		(a) => a.completed
	).length;
	const completedActivitiesPercentage = Math.round(
		(completedActivitiesCount / activities.length) * 100
	);

	return (
		<div className="p-5 mx-auto bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl text-gray-800 font-sans flex flex-col gap-5 w-full">
			{/* Top Row: Mood + Tip + Completion */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Mood Card */}
				<div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 border-2 border-gray-200/70 font-inter flex flex-col justify-between gap-2">
					<h2 className="text-lg font-semibold text-gray-800">
						Today's Mood
					</h2>
					<div
						className={`text-3xl font-extrabold font-inter`}
						style={{ color: moodInfo.colour }}
					>
						{moodInfo.text}
					</div>
				</div>

				{/* Quick Tip */}
				<div className="bg-white rounded-2xl p-4 border-2 border-gray-200/70 flex flex-col justify-between gap-2">
					<div className="flex items-center gap-2 text-yellow-500">
						<Lightbulb size={24} />
						<h2 className="text-lg font-semibold text-gray-800 font-inter">
							Quick Tip
						</h2>
					</div>
					<p className="text-gray-600 text-sm leading-snug font-inter">
						{randomTip}
					</p>
				</div>

				{/* Completion Summary */}
				<div className="bg-white rounded-2xl p-4 border-2 border-gray-200/70 flex flex-col justify-between gap-2">
					<h2 className="text-lg font-semibold font-inter text-gray-800">
						Today's Progress
					</h2>
					<div className="flex items-center gap-3">
						<div className="flex-1 bg-gray-200 rounded-full h-2">
							<div
								className="bg-green-500 h-2 rounded-full transition-all duration-500"
								style={{
									width: `${completedActivitiesPercentage}%`,
								}}
							></div>
						</div>
						<span className="text-sm font-medium text-gray-700">
							{completedActivitiesPercentage}%
						</span>
					</div>
				</div>
			</div>

			{/* Middle: Activities */}
			<div className="bg-white rounded-2xl p-4 border-2 border-gray-200/70">
				<h2 className="text-lg font-semibold mb-3 font-inter">
					Daily Activities
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					{activities.map((activity, i) => (
						<div
							key={i}
							className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
								activity.completed
									? "bg-green-100 border border-green-300"
									: "bg-gray-100 border border-gray-200"
							} hover:scale-102`}
						>
							<div className="flex items-center gap-2 text-sm">
								{activity.icon}
								<span className="font-medium">
									{activity.name}
								</span>
							</div>
							{activity.completed ? (
								<CheckCircle2
									size={18}
									className="text-green-500"
								/>
							) : (
								<Circle size={16} className="text-gray-400" />
							)}
						</div>
					))}
				</div>
			</div>

			{/* Bottom: Mood Trend Chart */}
			<div className="bg-white rounded-2xl p-4 border-2 border-gray-200/70 font-inter">
				<h2 className="text-lg font-semibold mb-3">
					Mood Trend (This Week)
				</h2>
				<div className="w-full h-40">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={moodsThisWeek}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="day" />
							<YAxis domain={[1, 10]} />
							<RechartTooltip />
							<Line
								type="monotone"
								dataKey="mood"
								stroke="#6366f1"
								strokeWidth={3}
								activeDot={{ r: 6 }}
								dot={(props) => {
									const { cx, cy, payload } = props;
									return (
										<circle
											cx={cx}
											cy={cy}
											r={payload.isToday ? 7 : 4}
											fill={
												payload.isToday
													? "#6366f1"
													: "#c7d2fe"
											}
											stroke="#fff"
											strokeWidth={1}
										/>
									);
								}}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default WBDashboard;
