import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import eventService from "services/event";
import { Event } from "@common/types/event";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const now = dayjs();
const Events: React.FC = () => {
	const navigate = useNavigate();
	const [events, setEvents] = useState<Event[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
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
			(e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				e.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
		eventService.getAllEvents().then((res) => setEvents(res));
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

			{!searchTerm ? (
				sections.map((section) => (
					<Section
						key={section.title}
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
						{filteredEvents.map((event) => (
							<EventCard
								key={event._id}
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

const Section: React.FC<{
	title: string;
	events: Event[];
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}> = ({ title, events, setEvents }) => {
	return (
		<div className="mb-15 relative">
			<h2 className="text-2xl font-semibold mb-2 text-gray-800">
				{title}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{events.map((event) => (
					<EventCard
						key={event._id}
						event={event}
						setEvent={(newEvent) =>
							setEvents((oldEvents) =>
								oldEvents.map((e) =>
									e._id === newEvent._id ? newEvent : e
								)
							)
						}
					/>
				))}
			</div>
		</div>
	);
};
const EventCard: React.FC<{
	event: Event;
	setEvent: (event: Event) => void;
}> = ({ event, setEvent }) => {
	const { user } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const [hovered, setHovered] = useState(false);

	const startTime = new Date(event.startDate).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	const endTime = new Date(event.endDate).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	if (!user?._id) {
		return null;
	}

	const isJoined = event.participants.includes(user._id);
	const handleToggleJoin = async (e) => {
		e.stopPropagation();
		if (!user?._id || !event?._id) return;
		let newEvent;
		if (isJoined) {
			newEvent = await eventService.leaveEvent(user._id, event._id);
		} else {
			newEvent = await eventService.joinEvent(user._id, event._id);
		}
		setEvent(newEvent);
	};

	return (
		<div
			onClick={() => navigate(`/events-hub/${event._id}`)}
			className="relative z-10 overflow-visible cursor-pointer"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<motion.div
				animate={{ scale: hovered ? 1.03 : 1 }}
				className="relative cursor-pointer rounded-2xl overflow-hidden shadow-md h-64"
			>
				<img
					src={event.coverImage?.url ?? ""}
					alt={event.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
					<h3 className="text-white text-lg font-semibold">
						{event.title}
					</h3>
					<p className="text-white/90 text-sm line-clamp-2">
						{event.description}
					</p>
				</div>
			</motion.div>

			{/* Hover Expanded Card */}
			{hovered && (
				<motion.div
					initial={{ scale: 1 }}
					animate={{ scale: 1.05 }}
					exit={{ scale: 1 }}
					transition={{ duration: 0.2 }}
					className="absolute top-0 left-0 w-full rounded-2xl overflow-hidden z-50 shadow-lg"
					style={{ height: 320 }}
				>
					<img
						src={event.coverImage?.url ?? ""}
						alt={event.title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bottom-20 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
						<h3 className="text-white text-lg font-bold">
							{event.title}
						</h3>
						<p className="text-white/90 text-sm line-clamp-3">
							{event.description}
						</p>
					</div>
					<div className="absolute bottom-0 left-0 w-full bg-white/95 p-3 text-gray-800 backdrop-blur-sm rounded-b-2xl">
						<p className="text-sm mb-1 whitespace-pre-wrap">
							🕒 {startTime} - {endTime} |{"  "}
							{event.participants.length} joined
						</p>
						{event.location && (
							<p className="text-sm mb-1">📍 {event.location}</p>
						)}
						<p className="text-sm mb-2">
							Categories: {event.categories.join(", ")}
						</p>
						<button
							onClick={handleToggleJoin}
							className="w-full bg-indigo-600 text-white py-1.5 rounded-full text-sm hover:bg-indigo-500 transition"
						>
							{isJoined ? "Joined" : "Join Event"}
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default Events;
