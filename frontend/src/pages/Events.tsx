import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import eventService from "services/event";
import { Event } from "@common/types/event";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import EventCard from "components/event/EventCard";
import EventSection from "components/event/EventSection";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const now = dayjs();
const Events: React.FC = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState<Event[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<Set<string>>(
		new Set(["All"])
	);

	const categories = [
		...new Set(["All", ...events.map((e) => e.categories).flat()]),
	];

	const filteredEvents = events.filter(
		(e) =>
			(selectedCategory.has("All") ||
				e.categories.some((c) => selectedCategory.has(c))) &&
			(e.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
				e.description
					.toLowerCase()
					.includes(searchTerm.trim().toLowerCase()))
	);

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

	useEffect(() => {
		setIsLoading(true);
		eventService.getAllEvents().then((res) => {
			setEvents(res);
			setIsLoading(false);
		});
	}, []);

	return (
		<div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
				<h1 className="text-4xl font-bold text-gray-900 font-inter">
					Events Hub
				</h1>
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
						className="px-4 py-2 rounded-full border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
					/>
					<button
						onClick={() => navigate("/events-hub/new")}
						className="px-4 py-2 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-500 transition text-nowrap"
					>
						+ Add Event
					</button>
				</div>
			</div>

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
