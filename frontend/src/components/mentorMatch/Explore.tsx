import { User } from "@common/types/user";
import {
	MagnifyingGlassIcon,
	FunnelIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import userService from "../../services/user";
import { useAppSelector } from "../../redux/store";
import dayjs from "dayjs";

const EXPERIENCE_RANGES: { [key: string]: [number, number] } = {
	Junior: [0, 2],
	Mid: [3, 5],
	Senior: [6, 10],
	Lead: [11, Infinity],
};

const Explore = () => {
	const { user } = useAppSelector((state) => state.user);
	const [openMessageModal, setOpenMessageModal] = useState<User | null>(null);
	const [message, setMessage] = useState("");
	const [mentors, setMentors] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [filterOpen, setFilterOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: string[];
	}>({
		experienceLevel: [],
		skills: [],
		languages: [],
		strengths:[]
	});

	useEffect(() => {
		userService.getTopMatchedMentors(user?._id, undefined).then((res) => {
			setMentors(res);
			setLoading(false);
		});
	}, []);

	const FILTER_OPTIONS = {
		experienceLevel: ["Junior", "Mid", "Senior", "Lead"],
		skills: [
			...new Set(
				mentors.flatMap((mentor) =>
					mentor.skills.map((skill) => skill.name)
				)
			),
		],
		languages: [
			...new Set(
				mentors.flatMap((mentor) =>
					mentor.languages.map((language) => language.name)
				)
			),
		],
		strengths: [
			...new Set(
				mentors.flatMap((mentor) =>
					mentor.strengths.map((strength) => strength.name)
				)
			),
		],
	};

	const toggleFilter = (category: string, option: string) => {
		setSelectedFilters((prev) => {
			const current = prev[category] || [];
			return {
				...prev,
				[category]: current.includes(option)
					? current.filter((o) => o !== option)
					: [...current, option],
			};
		});
	};

	const SkeletonCard = () => (
		<div className="bg-white rounded-2xl border border-gray-300 overflow-hidden animate-pulse">
			<div className="h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%]"></div>

			<div className="p-4 space-y-3">
				<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
				<div className="h-3 w-1/3 bg-gray-200 rounded"></div>

				<div className="flex flex-wrap gap-2 mt-2">
					{Array(3)
						.fill(0)
						.map((_, i) => (
							<span
								key={i}
								className="h-5 w-12 bg-gray-200 rounded-full animate-pulse"
								style={{ animationDelay: `${i * 0.1}s` }}
							></span>
						))}
				</div>
			</div>
		</div>
	);

	const getExperienceYears = (mentor: User) => {
		const hireDate = new Date(mentor.hireDate);
		const today = new Date();
		const diffYears =
			(today.getTime() - hireDate.getTime()) /
			(1000 * 60 * 60 * 24 * 365);
		return Math.floor(diffYears);
	};

	const filteredMentors = mentors
		.filter((mentor) => {
			return mentor.name
				.toLowerCase()
				.includes(searchValue.trim().toLowerCase());
		})
		.filter((mentor) => {
			if (selectedFilters.experienceLevel.length === 0) return true;
			const years = getExperienceYears(mentor);
			return selectedFilters.experienceLevel.some((level) => {
				const [min, max] = EXPERIENCE_RANGES[level];
				return years >= min && years <= max;
			});
		})
		.filter((mentor) => {
			if (selectedFilters.skills.length === 0) return true;
			const mentorSkillNames = mentor.skills.map((s) => s.name);
			return selectedFilters.skills.every((skill) =>
				mentorSkillNames.includes(skill)
			);
		})
		.filter((mentor) => {
			if (selectedFilters.languages.length === 0) return true;
			const mentorLanguagesNames = mentor.languages.map((s) => s.name);
			return selectedFilters.languages.every((language) =>
				mentorLanguagesNames.includes(language)
			);
		});

	const sendMentorRequest = async (mentorID: string, message: string) => {
		await userService.sendMentorshipRequest(mentorID, message);
		setOpenMessageModal(null);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -15 }}
			className="space-y-8"
		>
			<h2 className="text-2xl font-semibold text-indigo-700 mb-[24px] font-inter">
				Explore
			</h2>
			{/* Header + Search */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
				<div className="relative w-full">
					<MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search for mentors"
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
				<button
					onClick={() => setFilterOpen(true)}
					className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200"
				>
					<FunnelIcon className="w-5 h-5" /> Filters
				</button>

				{/* Filter Dropdown */}
				<AnimatePresence>
					{filterOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="absolute top-40 right-9 w-64 bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4"
						>
							<div className="flex justify-between items-center">
								<h4 className="font-semibold text-gray-800">
									Filters
								</h4>
								<button onClick={() => setFilterOpen(false)}>
									<XMarkIcon className="w-5 h-5 text-gray-500" />
								</button>
							</div>
							<div className="max-h-100 overflow-y-auto flex flex-col gap-4">
								{/* Experience Filter */}
								<div>
									<p className="text-gray-600 text-sm font-medium mb-1">
										Experience
									</p>
									<div className="flex flex-wrap gap-2">
										{FILTER_OPTIONS.experienceLevel.map(
											(option) => (
												<button
													key={option}
													onClick={() =>
														toggleFilter(
															"experienceLevel",
															option
														)
													}
													className={`px-2 py-1 text-xs rounded-full border ${
														selectedFilters.experienceLevel.includes(
															option
														)
															? "bg-blue-500 text-white border-blue-500"
															: "bg-gray-100 text-gray-700 border-gray-200"
													}`}
												>
													{option}
												</button>
											)
										)}
									</div>
								</div>

								<div>
									<p className="text-gray-600 text-sm font-medium mb-1">
										Skills
									</p>
									<div className="flex flex-wrap gap-2">
										{FILTER_OPTIONS.skills.map((option) => (
											<button
												key={option}
												onClick={() =>
													toggleFilter(
														"skills",
														option
													)
												}
												className={`px-2 py-1 text-xs rounded-full border ${
													selectedFilters.skills.includes(
														option
													)
														? "bg-blue-500 text-white border-blue-500"
														: "bg-gray-100 text-gray-700 border-gray-200"
												}`}
											>
												{option}
											</button>
										))}
									</div>
								</div>

								<div>
									<p className="text-gray-600 text-sm font-medium mb-1">
										Strengths
									</p>
									<div className="flex flex-wrap gap-2">
										{FILTER_OPTIONS.strengths.map(
											(option) => (
												<button
													key={option}
													onClick={() =>
														toggleFilter(
															"strengths",
															option
														)
													}
													className={`px-2 py-1 text-xs rounded-full border ${
														selectedFilters.strengths.includes(
															option
														)
															? "bg-blue-500 text-white border-blue-500"
															: "bg-gray-100 text-gray-700 border-gray-200"
													}`}
												>
													{option}
												</button>
											)
										)}
									</div>
								</div>

								<div>
									<p className="text-gray-600 text-sm font-medium mb-1">
										Languages
									</p>
									<div className="flex flex-wrap gap-2">
										{FILTER_OPTIONS.languages.map(
											(option) => (
												<button
													key={option}
													onClick={() =>
														toggleFilter(
															"languages",
															option
														)
													}
													className={`px-2 py-1 text-xs rounded-full border ${
														selectedFilters.languages.includes(
															option
														)
															? "bg-blue-500 text-white border-blue-500"
															: "bg-gray-100 text-gray-700 border-gray-200"
													}`}
												>
													{option}
												</button>
											)
										)}
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{loading
					? Array(12)
							.fill(0)
							.map((_, i) => <SkeletonCard key={i} />)
					: filteredMentors
							.filter((m) =>
								m.name
									.toLowerCase()
									.includes(searchValue.trim().toLowerCase())
							)
							.map((m, i) => (
								<motion.div
									key={m._id}
									whileHover={{ scale: 1.02 }}
									className="bg-white rounded-2xl border border-gray-300 overflow-hidden transition flex flex-col"
								>
									{/* Avatar */}
									<img
										src={m.avatar}
										className="h-40 w-full object-cover"
									/>

									{/* Info */}
									<div className="p-4 flex flex-col flex-1 overflow-auto">
										{/* Name & Position */}
										<h3 className="text-lg font-semibold text-gray-800">
											{m.name}
										</h3>
										<p className="text-sm text-gray-500">
											{m.position}
										</p>

										{/* Department & Unit */}
										<div className="flex gap-4 mt-2 text-sm text-gray-600">
											{m.department && (
												<span>🏢 {m.department}</span>
											)}
											{m.unit && <span>📌 {m.unit}</span>}
										</div>

										{/* Hire Date */}
										{m.hireDate && (
											<p className="mt-1 text-sm text-gray-500">
												🗓 Joined:{" "}
												{dayjs(m.hireDate).format(
													"DD MMM YYYY"
												)}
											</p>
										)}

										{/* Skills */}
										{m.skills.length > 0 && (
											<div className="mt-3">
												<p className="text-sm font-inter font-bold text-gray-500 mb-1">
													Skills
												</p>
												<div className="flex flex-wrap gap-2">
													{m.skills.map((s) => (
														<span
															key={s.name}
															className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
														>
															{s.name}
														</span>
													))}
												</div>
											</div>
										)}

										{/* Languages */}
										{m.languages?.length > 0 && (
											<div className="mt-3">
												<p className="text-sm font-inter font-bold text-gray-500 mb-1">
													Languages
												</p>
												<div className="flex flex-wrap gap-2">
													{m.languages.map((lang) => (
														<span
															key={lang.name}
															className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
														>
															{lang.name} (
															{lang.proficiency})
														</span>
													))}
												</div>
											</div>
										)}

										{/* Strengths */}
										{m.strengths?.length > 0 && (
											<div className="mt-3">
												<p className="text-sm font-inter font-bold text-gray-500 mb-1">
													Strengths
												</p>
												<div className="flex flex-wrap gap-2">
													{m.strengths.map((st) => (
														<span
															key={st.name}
															className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
														>
															{st.name} (
															{st.level})
														</span>
													))}
												</div>
											</div>
										)}

										{/* Bio */}
										<p className="text-sm text-gray-700 mt-4 flex-1 whitespace-pre-wrap">
											{m.bio}
										</p>

										{/* Request Button */}
										<button
											onClick={() => {
												if (!m._id) return;
												setOpenMessageModal(m);
											}}
											className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-full text-sm hover:bg-indigo-500 transition"
										>
											Send Request
										</button>
									</div>
								</motion.div>
							))}
			</div>
			<AnimatePresence>
				{openMessageModal && (
					<motion.div
						className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 relative"
							initial={{ y: 50, opacity: 0, scale: 0.95 }}
							animate={{ y: 0, opacity: 1, scale: 1 }}
							exit={{ y: 50, opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<h3 className="text-lg font-semibold">
								Send a request message to{" "}
								{openMessageModal.name}
							</h3>

							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message..."
								className="border border-gray-300 rounded-xl p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
								rows={4}
							/>

							<div className="flex justify-end gap-3 mt-2">
								<button
									className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
									onClick={() => setOpenMessageModal(null)}
								>
									Cancel
								</button>
								<button
									className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
									onClick={() => {
										if (!openMessageModal._id) return;
										sendMentorRequest(
											openMessageModal._id,
											message
										);
									}}
								>
									Send
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Explore;
