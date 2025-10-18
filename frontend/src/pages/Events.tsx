import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import eventService from "services/event";
import { Event } from "@common/types/event";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import EventCard from "components/event/EventCard";
import EventSection from "components/event/EventSection";
import { Star, Calendar, ChevronDown, User2 } from "lucide-react"; // ✅ new icons

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const now = dayjs();

const Events: React.FC = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState<Event[]>([]);
	const [openDropdown, setOpenDropdown] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<Set<string>>(
		new Set(["All"])
	);
	const [showJoinedOnly, setShowJoinedOnly] = useState<
		"all" | "joined" | "mine"
	>("all");

	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		setIsLoading(true);
		eventService.getAllEvents().then((res) => {
			setEvents(res);
			setIsLoading(false);
		});
	}, []);

	const filteredEvents = events
		.filter((e) => {
			if (showJoinedOnly === "joined") {
				return e.participants?.some((p) => p === user?._id);
			} else if (showJoinedOnly === "mine") {
				return e.creator._id === user?._id;
			} else {
				return true;
			}
		})
		.filter(
			(e) =>
				(selectedCategory.has("All") ||
					e.categories.some((c) => selectedCategory.has(c))) &&
				(e.title
					.toLowerCase()
					.includes(searchTerm.trim().toLowerCase()) ||
					e.description
						.toLowerCase()
						.includes(searchTerm.trim().toLowerCase()))
		);

	const categories = [
		...new Set(["All", ...events.map((e) => e.categories).flat()]),
	];

	const sections = [
		{ title: "Recommended for You", events: filteredEvents.slice(0, 3) },
		{
			title: "Trending Now",
			events: filteredEvents
				.filter((event) =>
					dayjs(event.startDate).isSameOrAfter(now, "day")
				)
				.sort((a, b) => {
					const scoreA =
						(a.participants?.length || 0) +
						(a.comments?.length || 0);
					const scoreB =
						(b.participants?.length || 0) +
						(b.comments?.length || 0);
					return scoreB - scoreA;
				})
				.slice(0, 6),
		},
		{
			title: "Upcoming This Week",
			events: filteredEvents.filter((event) =>
				dayjs(event.startDate).isSameOrAfter(now, "day")
			),
		},
		{
			title: "Workshops & Training",
			events: filteredEvents.filter((e) =>
				e.categories.includes("Workshop")
			),
		},
	];
	const dropdownOptions = [
		{
			label: "All Events",
			icon: <Calendar className="w-4 h-4 text-indigo-500" />,
			value: "all",
		},
		{
			label: "Joined Events",
			icon: <Star className="w-4 h-4 text-yellow-400" />,
			value: "joined",
		},
		{
			label: "My Events",
			icon: <User2 className="w-4 h-4 text-green-500" />,
			value: "mine",
		},
	];
	const selectedOption = dropdownOptions.find(
		(opt) => opt.value === showJoinedOnly
	)!;

	return (
		<div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
				<h1 className="text-4xl font-bold text-gray-900 font-inter">
					Events Hub
				</h1>

				<div className="relative">
					<div
						onClick={() => setOpenDropdown((prev) => !prev)}
						className={`flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer shadow-sm border transition-all bg-white/70 backdrop-blur-sm hover:shadow-md ${
							showJoinedOnly
								? "border-indigo-600 text-indigo-700"
								: "border-gray-300 text-gray-700"
						}`}
					>
						{selectedOption.icon}
						<span className="font-medium">
							{selectedOption.label}
						</span>
						<motion.div
							animate={{ rotate: openDropdown ? 180 : 0 }}
							transition={{ duration: 0.2 }}
						>
							<ChevronDown className="w-4 h-4 opacity-70" />
						</motion.div>
					</div>
					<AnimatePresence>
						{openDropdown && (
							<motion.div
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.25 }}
								className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50"
							>
								{dropdownOptions.map((opt) => (
									<div
										key={opt.label}
										onClick={() => {
											setShowJoinedOnly(opt.value as any);
											setOpenDropdown(false);
										}}
										className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all ${
											opt.value === showJoinedOnly
												? "bg-indigo-50 text-indigo-700 font-medium"
												: "hover:bg-gray-50 text-gray-700"
										}`}
									>
										{opt.icon}
										<span>{opt.label}</span>
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<div className="flex justify-between mb-8">
				<div className="flex flex-wrap gap-3">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => {
								if (!selectedCategory.has(cat)) {
									setSelectedCategory(
										new Set([...selectedCategory, cat])
									);
								} else if (selectedCategory.size > 1) {
									setSelectedCategory(
										new Set(
											[...selectedCategory].filter(
												(c) => c !== cat
											)
										)
									);
								}
							}}
							className={`px-4 py-2 rounded-full text-sm font-medium transition ${
								selectedCategory.has(cat)
									? "bg-indigo-600 text-white shadow-lg"
									: "bg-white/40 backdrop-blur-sm text-indigo-700 hover:bg-indigo-100"
							}`}
						>
							{cat}
						</button>
					))}
				</div>
				<div className="flex gap-2 items-center w-full max-w-120">
					<input
						type="text"
						placeholder="Search events"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 w-full"
					/>
					<button
						onClick={() => navigate("/events-hub/new")}
						className="px-4 py-2 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-500 transition text-nowrap"
					>
						+ Add Event
					</button>
				</div>
			</div>

			{/* Content */}
			{isLoading ? (
				<div className="flex justify-center items-center min-h-[50vh]">
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 1 }}
						className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
					/>
				</div>
			) : !searchTerm ? (
				sections.map((section, index) => (
					<EventSection
						key={section.title}
						index={index}
						title={section.title}
						events={section.events}
						setEvents={setEvents}
					/>
				))
			) : (
				<div className="mb-15 relative">
					<h2 className="text-2xl font-semibold mb-4 text-gray-800">
						{`${filteredEvents.length} Results`}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredEvents.map((event, index) => (
							<EventCard
								key={event._id}
								index={index}
								event={event}
								setEvent={(newEvent) =>
									setEvents((oldEvents) =>
										oldEvents.map((e) =>
											e._id === newEvent._id
												? newEvent
												: e
										)
									)
								}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Events;
