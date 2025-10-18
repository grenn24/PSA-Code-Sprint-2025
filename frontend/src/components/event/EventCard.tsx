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
const EventCard: React.FC<Prop> = ({ index, event, setEvent }) => {
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
				{event.coverImage?.url ? (
					<img
						src={event.coverImage?.url ?? ""}
						alt={event.title}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-400 animate-pulse" />
				)}

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
					animate={{ scale: 1.08 }}
					exit={{ scale: 1 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="absolute top-0 left-0 w-full h-80 rounded-2xl overflow-hidden z-50 shadow-lg"
				>
					{/* Background Image or Gradient */}
					{event.coverImage?.url ? (
						<img
							src={event.coverImage.url}
							alt={event.title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-400 animate-pulse" />
					)}

					{/* Overlay Gradient */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40"></div>

					{/* Content */}
					<div className="absolute bottom-0 w-full text-white z-20">
						<div className="p-2">
							<h3 className="text-lg font-bold">{event.title}</h3>
							<p className="text-sm leading-tight line-clamp-3">
								{event.description}
							</p>
						</div>

						<div className="bg-white/70 text-gray-900 rounded-b-2xl p-3 backdrop-blur-sm font-inter flex flex-col gap-2">
							{/* Creator */}
							<div className="flex items-center gap-2">
								<img
									src={event.creator.avatar}
									alt={event.creator.name}
									className="w-8 h-8 rounded-full object-cover shadow-sm"
								/>
								<span className="text-base font-medium">
									{event.creator.name}
								</span>
							</div>

							{/* Time & Participants */}
							<p className="text-sm">
								🕒 {startTime} - {endTime} |{" "}
								{event.participants.length} joined
							</p>
							{event.location && (
								<p className="text-sm">📍 {event.location}</p>
							)}

							{/* Categories */}
							{event.categories?.length > 0 && (
								<div className="flex flex-wrap gap-1.5">
									{event.categories.map((cat, i) => (
										<span
											key={i}
											className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600 font-medium"
										>
											{cat}
										</span>
									))}
								</div>
							)}

							{/* Join Button */}
							<button
								onClick={handleToggleJoin}
								className="w-full bg-indigo-600 text-white py-1.5 rounded-full text-sm hover:bg-indigo-500 transition"
							>
								{isJoined ? "Joined" : "Join Event"}
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default EventCard;
