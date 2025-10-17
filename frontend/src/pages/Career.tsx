import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { setUser } from "redux/slices/user";
import dayjs from "dayjs";

interface Skill {
	name: string;
	level: string; // Beginner, Intermediate, Advanced
}

interface Course {
	name: string;
}

interface Position {
	name: string;
	focusAreas: string[];
	skills: Skill[];
	startDate: string;
	endDate?: string | null;
}

interface PotentialRole {
	position: Position;
	missingSkills: Skill[];
	recommendedCourses: Course[];
	relevance: number; // 0-100
}

const mockPotentialRoles: PotentialRole[] = [
	{
		position: {
			name: "Senior Product Manager",
			focusAreas: ["Product Strategy", "Leadership"],
			skills: [],
			startDate: "",
			endDate: null,
		},
		missingSkills: [
			{ name: "Data Analysis", level: "Intermediate" },
			{ name: "Leadership", level: "Beginner" },
			{ name: "SQL", level: "Intermediate" },
		],
		recommendedCourses: [
			{ name: "Advanced Data Analytics" },
			{ name: "Leadership Fundamentals" },
			{ name: "SQL for Analysts" },
		],
		relevance: 85,
	},
	{
		position: {
			name: "Tech Lead",
			focusAreas: ["Architecture", "Mentorship"],
			skills: [],
			startDate: "",
			endDate: null,
		},
		missingSkills: [
			{ name: "System Design", level: "Intermediate" },
			{ name: "Leadership", level: "Intermediate" },
		],
		recommendedCourses: [
			{ name: "Leadership Fundamentals" },
			{ name: "Advanced System Design" },
		],
		relevance: 78,
	},
];

const renderStars = (percent: number) => {
	const fullStars = Math.floor(percent / 20); // 5 stars max
	const halfStar = percent % 20 >= 10;
	const stars: React.ReactNode[] = [];
	for (let i = 0; i < fullStars; i++)
		stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
	if (halfStar)
		stars.push(<StarIcon key="half" className="h-5 w-5 text-yellow-200" />);
	while (stars.length < 5)
		stars.push(
			<StarIcon key={stars.length} className="h-5 w-5 text-gray-300" />
		);
	return <div className="flex gap-1">{stars}</div>;
};

const Career: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [potentialPositions, setPotentialPositions] = useState<any[]>([]);

	useEffect(() => {
		if (!user?._id) return;
		userService.getUserByID(user._id).then((u) => dispatch(setUser(u)));
		userService
			.getPotentialPositions(user?._id)
			.then(setPotentialPositions);
	}, []);

	return (
		<div className="p-8 space-y-12 bg-gray-50 min-h-screen">
			<h1 className="text-4xl font-bold text-gray-800 font-inter">
				Career Roadmap
			</h1>

			{/* Current Positions */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-700 mb-4 font-inter">
					Current Positions
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[...(user?.careerPath || [])]
						.sort(
							(a, b) =>
								dayjs(b.startDate).unix() -
								dayjs(a.startDate).unix()
						)
						.map((pos, idx) => {
							const startDate = dayjs(pos.startDate).format(
								"MMM YYYY"
							);
							const endDate = pos.endDate
								? dayjs(pos.endDate).format("MMM YYYY")
								: "Present";

							return (
								<div
									key={idx}
									className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
								>
									<div className="flex justify-between items-center mb-2">
										<h3 className="text-lg font-bold text-gray-800">
											{pos.name}
										</h3>
										<span className="text-sm text-gray-500">{`${startDate} – ${endDate}`}</span>
									</div>
									<p className="text-sm text-gray-500 mb-3">
										Focus Areas: {pos.focusAreas.join(", ")}
									</p>
									<div className="mt-2">
										<h4 className="font-medium text-gray-700 mb-1">
											Skills
										</h4>
										<div className="flex flex-wrap gap-2">
											{pos.skills.map((skill, idx) => (
												<span
													key={idx}
													className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
												>
													{skill.name} ({skill.level})
												</span>
											))}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</section>

			{/* Potential Roles */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-700 mb-4 font-inter">
					Potential Next Roles
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{mockPotentialRoles.map((role, idx) => (
						<div
							key={idx}
							className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col justify-between"
						>
							<div>
								{/* Header with stars + relevance */}
								<div className="flex justify-between items-center mb-2">
									<h3 className="text-lg font-bold text-gray-800">
										{role.position.name}
									</h3>
									<div className="flex items-center gap-2">
										{renderStars(role.relevance)}
										<span className="text-sm text-gray-500">
											{role.relevance}%
										</span>
									</div>
								</div>

								{/* Focus Areas */}
								<p className="text-sm text-gray-500 my-2">
									Focus Areas:{" "}
									{role.position.focusAreas.join(", ")}
								</p>

								{/* Missing Skills */}
								<div className="mt-3">
									<h4 className="font-medium text-gray-700 mb-1">
										Missing Skills
									</h4>
									<ul className="list-disc list-inside text-gray-600">
										{role.missingSkills.map(
											(skill, idx) => (
												<li key={idx}>
													{skill.name} ({skill.level})
												</li>
											)
										)}
									</ul>
								</div>

								{/* Recommended Courses */}
								<div className="mt-3">
									<h4 className="font-medium text-gray-700 mb-1">
										Recommended Courses
									</h4>
									<ol className="list-decimal list-inside text-gray-600">
										{role.recommendedCourses.map(
											(course, idx) => (
												<li key={idx}>{course.name}</li>
											)
										)}
									</ol>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-3 mt-5">
								<button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
									Plan My Upskilling
								</button>
								<button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
									Explore Role
								</button>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Career;
