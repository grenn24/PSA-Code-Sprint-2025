import React, { useState } from "react";
import { motion } from "framer-motion";

interface Event {
	_id: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	category: string[];
	mode: "online" | "offline";
	location?: string;
	coverImage: string;
	participants: number;
}

const dummyEvents: Event[] = [
	{
		_id: "1",
		title: "PSA Hackathon Kickoff",
		description: "Join us for the exciting PSA Hackathon!",
		startDate: "2025-12-15T10:00:00Z",
		endDate: "2025-12-15T16:00:00Z",
		category: ["Workshop", "Tech"],
		mode: "offline",
		location: "PSA HQ",
		coverImage:
			"https://images.unsplash.com/photo-1551836022-d5d88e9218df?fit=crop&w=600&q=80",
		participants: 34,
	},
	{
		_id: "2",
		title: "Mindfulness Session",
		description:
			"Relax and rejuvenate with our guided mindfulness session.",
		startDate: "2025-12-16T14:00:00Z",
		endDate: "2025-12-16T15:30:00Z",
		category: ["Wellness"],
		mode: "online",
		location: "",
		coverImage:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=600&q=80",
		participants: 12,
	},
	{
		_id: "3",
		title: "React Workshop",
		description: "Hands-on session building apps with React.",
		startDate: "2025-12-17T10:00:00Z",
		endDate: "2025-12-17T12:00:00Z",
		category: ["Workshop", "Tech"],
		mode: "online",
		location: "Zoom",
		coverImage:
			"https://images.unsplash.com/photo-1581092580497-5f95e4f6b8f2?fit=crop&w=600&q=80",
		participants: 45,
	},
];

const Events: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("All");

	const categories = [
		"All",
		...Array.from(new Set(dummyEvents.flatMap((e) => e.category))),
	];

	const filteredEvents = dummyEvents.filter(
		(e) =>
			(selectedCategory === "All" ||
				e.category.includes(selectedCategory)) &&
			(e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				e.description.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	const sections = [
		{ title: "Recommended for You", events: filteredEvents.slice(0, 3) },
		{ title: "Trending Now", events: filteredEvents.slice(0, 3) },
		{ title: "Upcoming This Week", events: filteredEvents.slice(0, 4) },
		{
			title: "Workshops & Training",
			events: filteredEvents.filter((e) =>
				e.category.includes("Workshop")
			),
		},
	];

	return (
		<div className="p-8 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
				<h1 className="text-4xl font-extrabold text-gray-900">
					Discover Events
				</h1>
				<div className="flex gap-2 flex-wrap items-center">
					<input
						type="text"
						placeholder="Search events..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72"
					/>
					<button className="px-4 py-2 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-500 transition">
						+ Add Event
					</button>
				</div>
			</div>

			<div className="flex flex-wrap gap-3 mb-8">
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => setSelectedCategory(cat)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition ${
							selectedCategory === cat
								? "bg-indigo-600 text-white shadow-lg"
								: "bg-white/40 backdrop-blur-sm text-indigo-700 hover:bg-indigo-100"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{sections.map((section) => (
				<Section
					key={section.title}
					title={section.title}
					events={section.events}
				/>
			))}
		</div>
	);
};

const Section: React.FC<{ title: string; events: Event[] }> = ({
	title,
	events,
}) => {
	return (
		<div className="mb-10 relative">
			<h2 className="text-2xl font-semibold mb-4 text-gray-800">
				{title}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{events.map((event) => (
					<EventCard key={event._id} event={event} />
				))}
			</div>
		</div>
	);
};
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
	const [hovered, setHovered] = useState(false);

	const startTime = new Date(event.startDate).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	const endTime = new Date(event.endDate).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div
			className="relative z-10 overflow-visible"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{ width: "100%" }} // ensures hover card width matches card
		>
			{/* Original Card */}
			<motion.div
				animate={{ scale: hovered ? 1.03 : 1 }}
				className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg h-72"
			>
				<img
					src={event.coverImage}
					alt={event.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
					<h3 className="text-white text-lg font-bold">
						{event.title}
					</h3>
					<p className="text-white/90 text-sm line-clamp-2">
						{event.description}
					</p>
				</div>
			</motion.div>

			{/* Hover Card */}
			{hovered && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.3 }}
					className="absolute top-0 left-0 w-full rounded-2xl overflow-hidden shadow-2xl z-50"
					style={{ height: 400 }}
				>
					<img
						src={event.coverImage}
						alt={event.title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
						<h3 className="text-white text-lg font-bold">
							{event.title}
						</h3>
						<p className="text-white/90 text-sm line-clamp-3">
							{event.description}
						</p>
					</div>
					<div className="absolute bottom-0 left-0 w-full bg-white p-4 text-gray-800">
						<p className="mb-1">
							{startTime} - {endTime} | {event.participants}{" "}
							joined
						</p>
						{event.location && (
							<p className="mb-1">📍 {event.location}</p>
						)}
						<p className="mb-1">
							Categories: {event.category.join(", ")}
						</p>
						<button className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-500 transition">
							Join
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
};


export default Events;
