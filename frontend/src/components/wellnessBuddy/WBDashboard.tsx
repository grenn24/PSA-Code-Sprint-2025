import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { getMoodInfo } from "./MoodChanges";
import userService from "services/user";
import { setUser } from "redux/slices/user";

interface Activity {
	name: string;
	duration?: string;
	completed: boolean;
}

interface WBDashboardProps {
	activities: Activity[];
}

const WBDashboard: React.FC<WBDashboardProps> = ({ activities }) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const todayMoods =
		user?.moods.filter((mood) => dayjs(mood.date).isSame(dayjs(), "day")) ||
		[];
	console.log(todayMoods);
	const moodInfo =
		todayMoods?.length === 0
			? getMoodInfo(undefined)
			: getMoodInfo(
					todayMoods?.reduce((a, b) => a + b.level, 0) /
						todayMoods?.length
			  );
	const completedCount = activities.filter((a) => a.completed).length;
	const totalCount = activities.length;
	const completionPercent = Math.round((completedCount / totalCount) * 100);

	useEffect(() => {
		if (!user?._id) return;
		userService
			.getUserByID(user?._id)
			.then((user) => dispatch(setUser(user)));
	}, []);

	return (
		<div
			className="p-8 mx-auto bg-white/60 backdrop-blur-lg border border-white/20
				rounded-3xl shadow-md text-black font-sans 
				flex flex-col md:flex-row gap-8 max-w-6xl"
		>
			{/* Left Column: Mood & Streak */}
			<div className="flex-1 flex flex-col justify-between font-inter">
				<div className="mb-6">
					<h2 className="text-2xl font-bold mb-2">Mood Today</h2>
					<div className={`text-3xl text-${moodInfo.colour}-300`}>
						{moodInfo.text}
					</div>
				</div>
			</div>

			{/* Center Column: Completed Activities */}
			<div className="flex-2">
				<h2 className="text-2xl font-bold mb-4">
					Completed Activities
				</h2>
				<div className="grid grid-cols-2 gap-4">
					{activities.map((activity, idx) => (
						<div
							key={idx}
							className={`flex justify-between items-center p-4 rounded-2xl transition-all duration-300
                ${activity.completed ? "bg-green-500/30" : "bg-gray-500/20"} 
                hover:scale-105 hover:shadow-lg`}
						>
							<div className="flex items-center gap-3">
								<span className="text-xl">
									{activity.completed ? "✅" : "⚪"}
								</span>
								<span className="font-medium">
									{activity.name}
								</span>
							</div>
							{activity.duration && (
								<span className="text-sm">
									{activity.duration}
								</span>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="flex-1 flex flex-col items-center justify-center">
				<h2 className="text-2xl font-bold mb-4">Weekly Completion</h2>
				<div className="relative w-36 h-36">
					<svg className="w-full h-full" viewBox="0 0 100 100">
						{/* Background Circle */}
						<circle
							cx="50"
							cy="50"
							r="45"
							stroke="#ffffff30"
							strokeWidth="10"
							fill="none"
						/>
						{/* Progress Circle */}
						<circle
							cx="50"
							cy="50"
							r="45"
							stroke="#4ade80"
							strokeWidth="10"
							fill="none"
							strokeDasharray={2 * Math.PI * 45} // 2πr
							strokeDashoffset={
								2 * Math.PI * 45 -
								(2 * Math.PI * 45 * completionPercent) / 100
							}
							strokeLinecap="round"
							transform="rotate(-90 50 50)"
						/>
					</svg>
					<div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
						{completionPercent}%
					</div>
				</div>
			</div>
		</div>
	);
};

export default WBDashboard;
