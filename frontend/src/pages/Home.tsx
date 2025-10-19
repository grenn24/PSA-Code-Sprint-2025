import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
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
	useSortable,
	rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Masonry from "react-masonry-css";
import { Course } from "@common/types/course";
import { setUser } from "redux/slices/user";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { User } from "@common/types/user";
import { RadialBar, RadialBarChart } from "recharts";

const breakpointColumnsObj = {
	default: 3,
	1024: 2,
	640: 1,
};

interface CardProp {
	title: string;
	children: React.ReactNode;
	onViewMore?: () => void;
}
const Card = ({ title, children, onViewMore }: CardProp) => (
	<div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-2xl font-bold font-inter text-gray-800">
				{title}
			</h2>

			{!!onViewMore && (
				<div className="relative group">
					<button
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onViewMore?.();
						}}
						onMouseDown={(e) => e.preventDefault()}
						onMouseUp={(e) => e.preventDefault()}
						className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition cursor-pointer select-none"
					>
						<ArrowRightIcon className="w-8 h-7 stroke-2" />
					</button>
					{/* Tooltip */}
					<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-md bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
						View More
					</div>
				</div>
			)}
		</div>

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
	};
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
};

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const sensors = useSensors(useSensor(PointerSensor));
	const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
	const [topMatches, setTopMatches] = useState<User[]>([]);
	const [leadershipPotential, setLeadershipPotential] = useState(0);
	const [isLeadershipPotentialLoading, setIsLeadershipPotentialLoading] =
		useState(true);

	const [cards, setCards] = useState<string[]>([
		"Career Path",
		"Leadership Potential",
		"Suggested Courses",
		"Recommended Mentors",
		"Skills",
		"Projects",
		"Education",
		"Strengths",
		"Languages",
		"Notifications",
	]);

	useEffect(() => {
		if (!user?._id) return;
		userService
			.getUserByID(user?._id)
			.then((user) => dispatch(setUser(user)));
		userService
			.getRecommendedCourses(user?._id)
			.then(setRecommendedCourses);
		userService.getTopMatchedMentors(user?._id, 6, 0).then(setTopMatches);
		userService
			.predictLeadershipPotential(user?._id)
			.then((leadershipPotential) => {
				setLeadershipPotential(leadershipPotential);
				setIsLeadershipPotentialLoading(false);
			});
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

	const onViewMore = {
		"Career Path": () => navigate("/career"),
		"Recommended Mentors": () => navigate("/mentor?tab=Suggested"),
	};

	const renderCardContent = (cardName: string) => {
		switch (cardName) {
			case "Career Path":
				return (
					<div className="relative">
						{[...(user?.careerPath || [])]
							?.sort(
								(x, y) =>
									new Date(y.startDate).getTime() -
									new Date(x.startDate).getTime()
							)
							.map((role, index) => {
								const today = new Date().getTime();
								const start = new Date(
									role.startDate
								).getTime();

								const isFuture = today < start;

								return (
									<div
										key={index}
										className="relative flex items-start mb-4 group hover:bg-gray-50 rounded-xl p-5 transition-all border border-gray-300"
									>
										{/* Content */}
										<div className="flex-1">
											{/* Role header */}
											<div className="flex justify-between items-center mb-3">
												<span
													className={`font-bold text-lg text-indigo-800`}
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
													<h4 className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-wide">
														Focus Areas
													</h4>
													<div className="flex flex-wrap gap-2">
														{role.focusAreas.map(
															(area, idx) => (
																<span
																	key={idx}
																	className={`text-sm font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-800`}
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
																	className={`text-sm px-3 py-1 rounded-full border border-indigo-300 text-indigo-700 bg-white hover:bg-indigo-50 transition`}
																>
																	{skill.name}
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
								bgColor = "bg-indigo-100 text-indigo-800";
							else if (lang.proficiency === "Conversational")
								bgColor = "bg-yellow-100 text-yellow-800";

							return (
								<div
									key={idx}
									className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium shadow-sm ${bgColor} transition cursor-pointer`}
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
								<div className="flex justify-between items-start mb-4 gap-4">
									<div>
										<h3 className="text-xl font-semibold text-gray-800 font-inter">
											{proj.name}
										</h3>
										<p className="text-md text-indigo-600 font-medium">
											{proj.role}
										</p>
									</div>

									{/* Project period */}
									<p className="text-md text-gray-500 text-right">
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
					<div className="space-y-4">
						{user?.skills.map((skill, idx) => {
							// Color coding based on level
							let levelColor = "#FBBF24"; // Beginner (yellow)
							if (skill.level >= 50 && skill.level < 80)
								levelColor = "#3B82F6"; // Intermediate (indigo)
							if (skill.level >= 80) levelColor = "#10B981"; // Advanced (green)

							return (
								<div
									key={idx}
									className="p-4 bg-white rounded-xl border border-gray-300 transition"
								>
									{/* Skill Name */}
									<div className="font-semibold text-gray-800 mb-2">
										{skill.name}
									</div>
									<div className="flex flex-wrap gap-2 mb-2">
										<span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
											{skill.functionArea}
										</span>
										<span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
											{skill.specialisation}
										</span>
									</div>

									{/* Progress Bar */}
									<div className="w-full bg-gray-200 rounded-full h-5 relative">
										<div
											className="h-5 rounded-full transition-all"
											style={{
												width: `${skill.level}%`,
												backgroundColor: levelColor,
											}}
										></div>
										<span className="absolute right-2 top-0 text-xs font-medium text-gray-700">
											{skill.level}%
										</span>
									</div>
								</div>
							);
						})}
					</div>
				);

			case "Suggested Courses":
				return (
					<div className="flex flex-col gap-4">
						{recommendedCourses.map((course, idx) => (
							<div
								key={idx}
								className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
							>
								{/* Ranking badge */}
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-semibold text-gray-500">
										#{idx + 1}
									</span>
									<span className="text-xs text-gray-400">
										{course.durationHours} hrs
									</span>
								</div>

								{/* Course name */}
								<h3 className="text-lg font-bold text-indigo-800 mb-2">
									{course.name}
								</h3>

								{/* Skills taught */}
								<div className="flex flex-wrap gap-2 mb-2">
									{course.skillsTaught.map((skill) => (
										<span
											key={skill.name}
											className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full"
										>
											{skill.name}
										</span>
									))}
								</div>

								{/* Description */}
								{course.description && (
									<p className="text-sm text-gray-600">
										{course.description}
									</p>
								)}
							</div>
						))}
					</div>
				);
			case "Recommended Mentors":
				return (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{topMatches.map((mentor, idx) => (
							<div
								key={idx}
								className="bg-white rounded-xl border border-gray-300 p-4 hover:bg-gray-50 transition cursor-pointer flex flex-col items-center text-center gap-2"
							>
								{/* Avatar */}
								<img
									src={mentor.avatar}
									alt={mentor.name}
									className="w-16 h-16 rounded-full object-cover"
								/>

								{/* Name */}
								<p className="font-semibold text-gray-800 text-lg leading-4.5">
									{mentor.name}
								</p>

								{/* Role */}
								<p className="text-sm text-gray-500">
									{mentor.position}
								</p>

								{/* Skills in Common */}
								{mentor.skills?.length > 0 && (
									<div className="mt-2 text-sm text-gray-600 font-medium">
										{mentor.skills.length} skill
										{mentor.skills.length > 1 ? "s" : ""} in
										common
									</div>
								)}
							</div>
						))}
					</div>
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
			case "Strengths":
				return (
					<div className="flex flex-wrap gap-3">
						{user?.strengths.map((strength, idx) => {
							const levelColors: Record<string, string> = {
								Advanced: "bg-green-100 text-green-800",
								Intermediate: "bg-yellow-100 text-yellow-800",
								Beginner: "bg-gray-100 text-gray-700",
							};

							return (
								<div
									key={idx}
									className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm ${
										levelColors[strength.level]
									} cursor-pointer hover:shadow-md transition`}
								>
									<span className="font-semibold">
										{strength.name}
									</span>
									<span className="px-2 py-0.5 text-xs rounded-full bg-white border border-gray-200">
										{strength.level}
									</span>
								</div>
							);
						})}
					</div>
				);
			case "Leadership Potential":
				if (isLeadershipPotentialLoading) {
					return (
						<div className="flex justify-center items-center h-64">
							<div className="w-14 h-14 border-4 border-gray-200 border-t-4 border-t-indigo-500 rounded-full animate-spin"></div>
						</div>
					);
				}

				const percentage = Math.round(leadershipPotential * 100);
				const data = [
					{
						name: "Leadership Potential",
						value: percentage,
						fill:
							percentage < 40
								? "#EF4444"
								: percentage < 70
								? "#FACC15"
								: "#10B981",
					},
				];

				return (
					<div className="flex flex-col items-center w-full gap-8">
						{/* Leadership Ring */}
						<div className="relative">
							<RadialBarChart
								width={240}
								height={240}
								cx="50%"
								cy="50%"
								innerRadius="70%"
								outerRadius="100%"
								barSize={18}
								data={data}
								startAngle={0}
								endAngle={leadershipPotential * 360}
							>
								<RadialBar dataKey="value" cornerRadius={15} />
							</RadialBarChart>

							<div className="absolute inset-0 flex flex-col items-center justify-center font-inter">
								<span className="text-3xl font-bold text-gray-900">
									{percentage}%
								</span>
								<span className="text-sm text-gray-500">
									Potential
								</span>
							</div>
						</div>

						{/* Leadership Reviews */}
						<div className="w-full max-w-2xl flex flex-col gap-2">
							{user?.leadershipReviews.length === 0 ? (
								<p className="text-gray-500 text-center">
									No leadership reviews yet
								</p>
							) : (
								user?.leadershipReviews.map((review, idx) => (
									<div
										key={idx}
										className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition-transform duration-300"
									>
										{/* Reviewer Info */}
										<div className="flex items-center gap-4">
											<img
												src={
													review.reviewer.avatar ||
													`https://ui-avatars.com/api/?name=${review.reviewer.name}&background=6366F1&color=fff`
												}
												alt={review.reviewer.name}
												className="w-12 h-12 rounded-full border-2 border-indigo-500"
											/>
											<div className="flex flex-col">
												<p className="font-semibold text-gray-900">
													{review.reviewer.name}
												</p>
												<p className="text-sm text-gray-500">
													{dayjs(review.date).format(
														"DD MMM YYYY"
													)}
												</p>
											</div>
										</div>

										{/* Ratings */}
										<div className="grid grid-cols-3 gap-3 text-sm">
											{Object.entries(review.ratings)
												.filter(
													([key]) =>
														key !== "_id" &&
														key !== "id"
												)
												.map(([key, value]) => (
													<div
														key={key}
														className="flex flex-col gap-1"
													>
														<span className="capitalize text-gray-600 text-xs">
															{key.replace(
																/([A-Z])/g,
																" $1"
															)}
														</span>
														<div className="flex items-center gap-1">
															{Array.from({
																length: 5,
															}).map((_, i) => (
																<svg
																	key={i}
																	className={`w-4 h-4 ${
																		i <
																		value
																			? "text-yellow-400"
																			: "text-gray-300"
																	}`}
																	fill="currentColor"
																	viewBox="0 0 20 20"
																>
																	<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
																</svg>
															))}
															<span className="text-gray-800 font-semibold ml-1">
																{value}/5
															</span>
														</div>
													</div>
												))}
										</div>

										{/* Comments */}
										{review.comments && (
											<blockquote className="border-l-2 border-indigo-500 pl-4 text-gray-700 italic mt-2">
												{review.comments}
											</blockquote>
										)}
									</div>
								))
							)}
						</div>
					</div>
				);
			case "Education":
				return (
					<div className="space-y-4">
						{user?.education.map((edu, index) => (
							<div
								key={index}
								className="bg-white rounded-xl border border-gray-300 p-3 transition-shadow duration-200 font-inter"
							>
								<h3 className="text-lg font-medium mb-2">
									{edu.institution}
								</h3>
								<p className="text-right font-semibold text-gray-500">
									{edu.degree}
								</p>
								<p className="text-right text-sm">
									{new Date(edu.startDate).toLocaleDateString(
										"en-US",
										{
											month: "short",
											year: "numeric",
										}
									)}
									{" - "}
									{edu.endDate
										? new Date(
												edu.endDate
										  ).toLocaleDateString("en-US", {
												month: "short",
												year: "numeric",
										  })
										: "Present"}
								</p>
							</div>
						))}
					</div>
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
					<h1 className="text-4xl font-bold text-gray-900">
						Welcome Back, {user?.name}!
					</h1>
					<p className="text-2xl text-gray-500 font-inter font-semibold">
						{user?.position}
					</p>
				</div>
			</div>

			{/* Grid Layout */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={cards} strategy={rectSortingStrategy}>
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="flex gap-6"
						columnClassName="flex flex-col gap-6"
					>
						{cards.map((cardName) => (
							<SortableCard key={cardName} id={cardName}>
								<Card
									title={cardName}
									onViewMore={onViewMore[cardName]}
								>
									{renderCardContent(cardName)}
								</Card>
							</SortableCard>
						))}
					</Masonry>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default Home;
