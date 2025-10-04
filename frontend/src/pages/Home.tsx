import React, { useEffect, useState } from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import { useAppSelector } from "../redux/store";
import userService from "../services/user";

const currentRole = "Operations Analyst";
const careerProgress = 65;
const suggestedCourses = [
	"Advanced Data Analytics",
	"Leadership Fundamentals",
	"Supply Chain Optimization",
];
const recommendedMentors = [
	{ name: "Alice Tan", role: "Senior Operations Manager" },
	{ name: "John Lim", role: "Team Lead, Logistics" },
];
const notifications = [
	"New course available: 'Digital Port Operations'",
	"Mentorship request from Emily Chen",
];

const mentorPieData = [
	{ name: "Matched", value: 2 },
	{ name: "Available", value: 8 },
];
const COLORS = ["#1976D2", "#BBDEFB"];

const Card = ({ title, children, className = "" }) => (
	<div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
		<h2 className="text-lg font-semibold font-inter text-gray-900 mb-4">
			{title}
		</h2>
		{children}
	</div>
);

const Home = () => {
	const { user: initialUserData } = useAppSelector((state) => state.user);
	const [user, setUser] = useState(initialUserData);
	useEffect(() => {
		userService.getUserByID(user?._id).then(setUser);
	}, []);

	return (
		<div className="min-h-dvh bg-gray-50 p-8 space-y-10 font-roboto">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 font-inter">
						Welcome Back, {user?.name}!
					</h1>
					<p className="text-gray-600 text-xl">{user?.position}</p>
				</div>
			</div>

			{/* Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Career Path Timeline */}
				<Card title="Career Path Progress" className="space-y-6">
					<div className="relative">
						{/* Vertical line */}
						<div className="absolute left-1 top-0 bottom-0 w-1 bg-gray-200"></div>

						{user?.careerPath?.map((role) => {
							const isCompleted = role.progress === 100;
							const isCurrent =
								role.progress > 0 && role.progress < 100;
							const isFuture = role.progress === 0;

							return (
								<div
									key={role?._id}
									className="relative flex items-start mb-8"
								>
									{/* Dot */}
									<div className="absolute left-0 mt-1">
										<div
											className={`w-4 h-4 rounded-full ${
												isCompleted
													? "bg-green-500"
													: isCurrent
													? "bg-blue-500"
													: "bg-gray-300"
											}`}
										></div>
									</div>

									{/* Content */}
									<div className="ml-7">
										<div className="flex justify-between items-center mb-1">
											<span
												className={`font-semibold ${
													isCompleted
														? "text-gray-800"
														: isCurrent
														? "text-blue-700"
														: "text-gray-400"
												}`}
											>
												{role.position}
											</span>
											<span className="text-sm text-gray-500">
												{role.progress}%
											</span>
										</div>
										<div className="text-sm text-gray-500 mb-1">
											{role.startedAt
												? new Date(
														role.startedAt
												  ).toLocaleDateString()
												: "TBD"}{" "}
											–{" "}
											{role.endedAt
												? new Date(
														role.endedAt
												  ).toLocaleDateString()
												: isFuture
												? "Future"
												: "Present"}
										</div>
										{role.skillsRequired.length > 0 && (
											<div className="flex flex-wrap gap-1">
												{role.skillsRequired.map(
													(skill, i) => (
														<span
															key={i}
															className={`text-xs px-2 py-0.5 rounded ${
																isCompleted
																	? "bg-green-100 text-green-800"
																	: isCurrent
																	? "bg-blue-100 text-blue-800"
																	: "bg-gray-100 text-gray-500"
															}`}
														>
															{skill}
														</span>
													)
												)}
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</Card>

				{/* Skills */}
				<Card title="Skills Progress" className="col-span-2">
					<ResponsiveContainer width="100%" height={220}>
						<BarChart data={user?.skills}>
							<XAxis dataKey="name" stroke="#9CA3AF" />
							<YAxis stroke="#9CA3AF" />
							<Tooltip />
							<Bar
								dataKey="level"
								fill="#1976D2"
								barSize={24}
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</Card>

				{/* Courses */}
				<Card title="Suggested Courses" className="col-span-2">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{suggestedCourses.map((course, idx) => (
							<div
								key={idx}
								className="bg-blue-50 p-4 rounded-lg shadow-sm text-blue-900 font-medium cursor-pointer hover:shadow-md transition"
							>
								{course}
							</div>
						))}
					</div>
				</Card>

				{/* Mentors */}
				<Card title="Recommended Mentors">
					<ResponsiveContainer width="100%" height={160}>
						<PieChart>
							<Pie
								data={mentorPieData}
								dataKey="value"
								innerRadius={45}
								outerRadius={65}
								startAngle={90}
								endAngle={-270}
							>
								{mentorPieData.map((entry, index) => (
									<Cell
										key={index}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					<ul className="mt-4 space-y-3">
						{recommendedMentors.map((mentor, idx) => (
							<li
								key={idx}
								className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition cursor-pointer"
							>
								<p className="font-semibold font-inter">
									{mentor.name}
								</p>
								<p className="text-gray-500 text-sm">
									{mentor.role}
								</p>
							</li>
						))}
					</ul>
				</Card>

				{/* Notifications */}
				<Card title="Notifications">
					<ul className="space-y-3">
						{notifications.map((note, idx) => (
							<li
								key={idx}
								className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
							>
								{note}
							</li>
						))}
					</ul>
				</Card>
			</div>
		</div>
	);
};

export default Home;
