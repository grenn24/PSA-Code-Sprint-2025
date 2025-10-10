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

const EXPERIENCE_RANGES: { [key: string]: [number, number] } = {
	Junior: [0, 2],
	Mid: [3, 5],
	Senior: [6, 10],
	Lead: [11, Infinity],
};

const Explore = () => {
	const { user } = useAppSelector((state) => state.user);
	const [mentors, setMentors] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [filterOpen, setFilterOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: string[];
	}>({
		experienceLevel: [],
		skills: [],
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

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -15 }}
			className="space-y-8"
		>
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
							<div className="flex justify-between items-center mb-2">
								<h4 className="font-semibold text-gray-800">
									Filters
								</h4>
								<button onClick={() => setFilterOpen(false)}>
									<XMarkIcon className="w-5 h-5 text-gray-500" />
								</button>
							</div>

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
												toggleFilter("skills", option)
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
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{loading
					? Array(12)
							.fill(0)
							.map((_, i) => <SkeletonCard key={i} />)
					: mentors
							.filter((m) =>
								m.name
									.toLowerCase()
									.includes(searchValue.trim().toLowerCase())
							)
							.filter((m) => {
								if (
									selectedFilters.experienceLevel.length > 0
								) {
									return selectedFilters.experienceLevel.some(
										(level) => {
											const [min, max] =
												EXPERIENCE_RANGES[level];
											return (
												m.experienceLevel >= min &&
												m.experienceLevel <= max
											);
										}
									);
								}
								return true;
							})
							.filter((m) => {
								if (selectedFilters.skills.length > 0) {
									return m.skills.some((s) =>
										selectedFilters.skills.includes(s.name)
									);
								}
								return true;
							})
							.map((m, i) => (
								<motion.div
									key={i}
									whileHover={{ scale: 1.02 }}
									className="bg-white rounded-2xl border border-gray-300 overflow-hidden transition"
								>
									<img
										src={m.avatar}
										className="h-40 w-full object-cover"
									/>
									<div className="p-4">
										<h3 className="font-semibold text-gray-800">
											{m.name}
										</h3>
										<p className="text-sm text-gray-500">
											{m.position}
										</p>
										<div className="flex flex-wrap gap-2 mt-2">
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
								</motion.div>
							))}
			</div>
		</motion.div>
	);
};

export default Explore;
