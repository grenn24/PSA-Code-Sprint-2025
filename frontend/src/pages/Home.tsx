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
import dayjs from "dayjs";
import { BellIcon, CheckCircleIcon, CircleIcon } from "lucide-react";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
	rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const suggestedCourses = [
	"Advanced Data Analytics",
	"Leadership Fundamentals",
	"Supply Chain Optimization",
];
const recommendedMentors = [
	{ name: "Alice Tan", role: "Senior Operations Manager" },
	{ name: "John Lim", role: "Team Lead, Logistics" },
];

const mentorPieData = [
	{ name: "Matched", value: 2 },
	{ name: "Available", value: 8 },
];
const COLORS = ["#1976D2", "#BBDEFB"];

const Card = ({ title, children, className = "" }) => (
	<div
		className={`bg-white rounded-xl shadow-md p-6 h-full flex flex-col ${className}`}
	>
		<h2 className="text-2xl font-bold font-inter text-gray-900 mb-4">
			{title}
		</h2>
		<div className="flex-1">{children}</div>
	</div>
);

const SortableCard = ({ id, children }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		cursor: "grab",
		height: "100%", 
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="h-full"
		>
			{children}
		</div>
	);
};

const Home = () => {
	const { user: initialUserData } = useAppSelector((state) => state.user);
	const [user, setUser] = useState(initialUserData);
	const sensors = useSensors(useSensor(PointerSensor));
	const [cards, setCards] = useState<string[]>([
		"Career Path",
		"Languages",
		"Projects",
		"Skills",
		"Suggested Courses",
		"Recommended Mentors",
		"Notifications",
	]);

	useEffect(() => {
		if (!user?._id) return;
		userService.getUserByID(user?._id).then(setUser);
	}, []);
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id && active.id !== over?.id) {
			setCards((prev) =>
				arrayMove(
					prev,
					cards.indexOf(active.id.toString()),
					cards.indexOf(over?.id.toString())
				)
			);
		}
	};

	const renderCardContent = (cardName: string) => {
		switch (cardName) {
			case "Career Path":
				return (
					<div className="relative pl-8">
						{/* Timeline line */}
						<div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>

						{user?.careerPath?.map((role, index) => {
							const today = new Date().getTime();
							const start = new Date(role.startDate).getTime();
							const end = role.endDate
								? new Date(role.endDate).getTime()
								: Infinity;

							const isCurrent = today >= start && today <= end;
							const isFuture = today < start;
							const isPast = today > end;

							const color = isCurrent
								? "blue"
								: isPast
								? "green"
								: "gray";

							return (
								<div
									key={index}
									className="relative flex items-start mb-10 group hover:bg-gray-50 rounded-xl p-5 transition-all shadow-sm"
								>
									{/* Timeline dot */}
									<div className="absolute left-4 top-5">
										<div
											className={`w-6 h-6 rounded-full shadow-md border-2 border-white bg-${color}-500`}
										></div>
									</div>

									{/* Content */}
									<div className="ml-10 flex-1">
										{/* Role header */}
										<div className="flex justify-between items-center mb-3">
											<span
												className={`font-semibold text-lg text-${color}-800`}
											>
												{role.name}
											</span>
											<span className="text-sm text-gray-500 italic">
												{role.startDate
													? new Date(
															role.startDate
													  ).toLocaleDateString()
													: "TBD"}{" "}
												–{" "}
												{role.endDate
													? new Date(
															role.endDate
													  ).toLocaleDateString()
													: isFuture
													? "Future"
													: "Present"}
											</span>
										</div>

										{/* Focus Areas */}
										{role.focusAreas?.length > 0 && (
											<div className="mb-3">
												<h4 className="text-xs uppercase font-semibold text-gray-500 mb-1 tracking-wide">
													Focus Areas
												</h4>
												<div className="flex flex-wrap gap-2">
													{role.focusAreas.map(
														(area, idx) => (
															<span
																key={idx}
																className={`text-sm font-medium px-3 py-1 rounded-full bg-${color}-100 text-${color}-800`}
															>
																{area}
															</span>
														)
													)}
												</div>
											</div>
										)}

										{/* Skills Used */}
										{role.skills?.length > 0 && (
											<div>
												<h4 className="text-xs uppercase font-semibold text-gray-500 mb-1 tracking-wide">
													Skills Used
												</h4>
												<div className="flex flex-wrap gap-2">
													{role.skills.map(
														(skill, idx) => (
															<span
																key={idx}
																className={`text-sm px-3 py-1 rounded-full border border-${color}-300 text-${color}-700 bg-white hover:bg-${color}-50 transition`}
															>
																{skill}
															</span>
														)
													)}
												</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				);
			case "Languages":
				return (
					<div className="flex flex-wrap gap-3">
						{user?.languages?.map((lang, idx) => {
							let bgColor = "bg-gray-100 text-gray-800";
							if (lang.proficiency === "Fluent")
								bgColor = "bg-green-100 text-green-800";
							else if (lang.proficiency === "Professional")
								bgColor = "bg-blue-100 text-blue-800";
							else if (lang.proficiency === "Conversational")
								bgColor = "bg-yellow-100 text-yellow-800";

							return (
								<div
									key={idx}
									className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium shadow-sm ${bgColor} hover:shadow-md transition cursor-pointer`}
								>
									<span>{lang.name}</span>
									<span className="text-xs font-normal">
										({lang.proficiency})
									</span>
								</div>
							);
						})}
					</div>
				);
			case "Projects":
				return (
					<div className="space-y-4">
						{user?.projects?.map((proj, idx) => (
							<div
								key={idx}
								className="p-5 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
							>
								{/* Header Row */}
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-xl font-semibold text-gray-800 font-inter">
											{proj.name}
										</h3>
										<p className="text-md text-indigo-600 font-medium">
											{proj.role}
										</p>
									</div>

									{/* Project period */}
									<p className="text-md text-gray-500">
										{proj.startDate
											? new Date(
													proj.startDate
											  ).toLocaleDateString()
											: "TBD"}{" "}
										–{" "}
										{proj.endDate
											? new Date(
													proj.endDate
											  ).toLocaleDateString()
											: "Present"}
									</p>
								</div>

								{/* Description */}
								<p className="text-gray-700 text-md leading-relaxed mb-4">
									{proj.description}
								</p>

								{/* Outcomes */}
								{proj.outcomes?.length > 0 && (
									<div className="space-y-0">
										<p className="text-md font-medium text-gray-700">
											Key Outcomes:
										</p>
										<ul className="list-disc pl-5 text-md text-gray-600 space-y-0.5">
											{proj.outcomes.map((outcome, i) => (
												<li key={i}>{outcome}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						))}
					</div>
				);
			case "Skills":
				return (
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
				);
			case "Suggested Courses":
				return (
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
				);
			case "Recommended Mentors":
				return (
					<>
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
					</>
				);
			case "Notifications":
				return (
					<ul className="space-y-3">
						{user?.notifications.map((notification, idx) => {
							const formattedDate = dayjs(
								notification.createdAt
							).format("DD MMM YYYY, h:mm A");
							const isRead = notification.read;

							return (
								<li
									key={idx}
									className={`flex items-start justify-between p-4 rounded-lg border transition shadow-sm ${
										isRead
											? "bg-gray-50 hover:bg-gray-100 border-gray-200"
											: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
									}`}
								>
									{/* Left side: Icon + message */}
									<div className="flex items-start gap-3">
										<div
											className={`p-2 rounded-full ${
												isRead
													? "bg-gray-200"
													: "bg-indigo-500"
											} text-white`}
										>
											<BellIcon size={18} />
										</div>

										<div>
											<p
												className={`text-sm font-medium ${
													isRead
														? "text-gray-700"
														: "text-indigo-900"
												}`}
											>
												{notification.message}
											</p>
											<p className="text-xs text-gray-500 mt-1">
												{formattedDate}
											</p>
										</div>
									</div>

									{/* Right side: Read status */}
									<div className="flex items-center gap-1">
										{isRead ? (
											<span className="flex items-center text-xs text-gray-500">
												<CheckCircleIcon
													size={14}
													className="mr-1 text-green-500"
												/>
												Read
											</span>
										) : (
											<span className="flex items-center text-xs text-indigo-600 font-medium">
												<CircleIcon
													size={12}
													className="mr-1 fill-indigo-500"
												/>
												New
											</span>
										)}
									</div>
								</li>
							);
						})}
					</ul>
				);
			default:
				return null;
		}
	};

	return (
		<div className="min-h-dvh bg-gray-100 p-8 space-y-10 font-roboto">
			{/* Header */}
			<div className="flex justify-between items-center font-inter">
				<div>
					<h1 className="text-3xl font-semibold text-gray-900">
						Welcome Back, {user?.name}
					</h1>
					<p className="text-gray-600 text-xl">{user?.position}</p>
				</div>
			</div>

			{/* Grid Layout */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={cards} strategy={rectSortingStrategy}>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{cards.map((cardName) => (
							<SortableCard key={cardName} id={cardName}>
								<Card title={cardName}>
									{renderCardContent(cardName)}
								</Card>
							</SortableCard>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default Home;
