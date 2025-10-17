import { Event } from "@common/types/event";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import eventService from "services/event";
import { motion } from "framer-motion";

interface Prop {
	index: number;
	event: Event;
	setEvent: (event: Event) => void;
}
const EventCard: React.FC<Prop> = ({index, event, setEvent }) => {
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

	const isJoined = !!event.participants.find(
		(participant) => (participant as string) === user._id
	);
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
			className={`relative z-${index} overflow-visible cursor-pointer`}
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

export default EventCard;