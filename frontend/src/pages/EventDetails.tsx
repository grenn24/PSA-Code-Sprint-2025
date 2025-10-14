import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import {
	Calendar,
	MapPin,
	Users,
	Video,
	MessageSquare,
	LogOut,
	UserPlus,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Event } from "@common/types/event";
import eventService from "services/event";
import { useAppSelector } from "redux/store";

const EventDetails = () => {
	const { user } = useAppSelector((state) => state.user);
	const params = useParams();
	const [event, setEvent] = useState<Event | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [newComment, setNewComment] = useState("");
	const [isAddingComment, setIsAddingComment] = useState(false);
	const [isJoining, setIsJoining] = useState(false);
	const handleAddComment = () => {};

	useEffect(() => {
		if (!params.id) return;

		eventService.getEventByID(params.id).then((event) => {
			setEvent(event);
			setIsLoading(false);
		});
	}, [params.id]);

	// 🎨 Loading shimmer component
	const LoadingSkeleton = () => (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white animate-pulse">
			<div className="w-full h-72 bg-gray-200 rounded-b-3xl" />
			<div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
				<div className="flex gap-3">
					<div className="w-24 h-6 bg-gray-200 rounded-full" />
					<div className="w-20 h-6 bg-gray-200 rounded-full" />
				</div>
				<div className="space-y-4">
					<div className="w-2/3 h-6 bg-gray-200 rounded" />
					<div className="w-full h-4 bg-gray-200 rounded" />
					<div className="w-5/6 h-4 bg-gray-200 rounded" />
					<div className="w-4/6 h-4 bg-gray-200 rounded" />
				</div>
				<div className="w-full h-24 bg-gray-200 rounded-2xl" />
				<div className="w-1/3 h-6 bg-gray-200 rounded" />
				<div className="space-y-4">
					<div className="w-full h-20 bg-gray-200 rounded-xl" />
					<div className="w-full h-20 bg-gray-200 rounded-xl" />
				</div>
			</div>
		</div>
	);

	if (isLoading) return <LoadingSkeleton />;

	if (!event) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-600">
				Event not found.
			</div>
		);
	}

	if (!user?._id) {
		return null;
	}
	const isJoined = event?.participants.includes(user._id);
	const handleToggleJoin = async () => {
		if (!user?._id || !event?._id) return;
		setIsJoining(true);
		let newEvent;
		if (isJoined) {
			newEvent = await eventService.leaveEvent(user._id, event._id);
		} else {
			newEvent = await eventService.joinEvent(user._id, event._id);
		}
		setEvent(newEvent);
		setIsJoining(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-900">
			{/* Cover Image */}
			<div className="relative w-full h-72 overflow-hidden rounded-b-3xl shadow-md">
				<img
					src={event.coverImage?.url || "/placeholder.jpg"}
					alt={event.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
				<div className="absolute bottom-6 left-6 text-white">
					<h1 className="text-3xl font-bold">{event.title}</h1>
					<p className="text-sm opacity-80 mt-1">
						Hosted by {event.creator?.name}
					</p>
				</div>
				{/* Floating Join/Leave Button */}
				<motion.button
					whileTap={{ scale: 0.97 }}
					onClick={handleToggleJoin}
					disabled={isJoining}
					className={`absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white shadow-lg transition 
						${
							isJoined
								? "bg-red-500/80 hover:bg-red-600"
								: "bg-indigo-600/80 hover:bg-indigo-700"
						} 
						${isJoining ? "opacity-70 cursor-wait" : ""}`}
				>
					{isJoining ? (
						<span>Loading...</span>
					) : isJoined ? (
						<>
							<LogOut size={18} />
							Leave Event
						</>
					) : (
						<>
							<UserPlus size={18} />
							Join Event
						</>
					)}
				</motion.button>
			</div>

			{/* Main Content */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="max-w-5xl mx-auto px-6 py-8 space-y-10"
			>
				{/* Categories & Info */}
				<div className="flex flex-wrap gap-3">
					{event.categories.map((cat) => (
						<span
							key={cat}
							className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
						>
							{cat}
						</span>
					))}
					{event.mode === "online" ? (
						<span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
							<Video size={16} /> Online
						</span>
					) : (
						<span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
							<MapPin size={16} /> Offline
						</span>
					)}
				</div>

				{/* Description */}
				<section>
					<h2 className="text-xl font-semibold mb-2">About</h2>
					<p className="text-gray-700 leading-relaxed whitespace-pre-line">
						{event.description}
					</p>
				</section>

				{/* Date & Time */}
				<section className="bg-white rounded-2xl p-6 shadow-sm flex flex-wrap gap-6 items-center justify-between">
					<div className="flex items-center gap-2 text-gray-700">
						<Calendar className="text-indigo-500" size={20} />
						<p>
							{dayjs(event.startDate).format(
								"DD MMM YYYY, h:mm A"
							)}{" "}
							- {dayjs(event.endDate).format("h:mm A")}
						</p>
					</div>
					<div className="flex items-center gap-2 text-gray-700">
						<Users className="text-indigo-500" size={20} />
						<p>{event.participants.length} participants</p>
					</div>
					{event.mode === "offline" && (
						<div className="flex items-center gap-2 text-gray-700">
							<MapPin className="text-indigo-500" size={20} />
							<p>{event.location}</p>
						</div>
					)}
				</section>

				{/* Comments Section */}
				<section>
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
						<MessageSquare className="text-indigo-500" />
						Comments ({event.comments.length})
					</h2>

					{/* Add Comment Box */}
					{isJoined && (
						<div className="bg-white rounded-xl p-4 shadow-sm mb-6 border border-gray-100">
							<textarea
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Share your thoughts..."
								className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
								rows={3}
							/>
							<div className="flex justify-end mt-2">
								<button
									onClick={handleAddComment}
									disabled={
										isAddingComment || !newComment.trim()
									}
									className="px-2 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
								>
									{isAddingComment
										? "Posting..."
										: "Post Comment"}
								</button>
							</div>
						</div>
					)}

					{/* Existing Comments */}
					<div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
						{event.comments.length === 0 ? (
							<p className="text-gray-500 italic">
								No comments yet.
							</p>
						) : (
							event.comments.map((c, idx) => (
								<div
									key={idx}
									className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition"
								>
									<div className="flex justify-between items-center">
										<p className="font-semibold text-gray-800">
											{c.author?.name || "Anonymous"}
										</p>
										<span className="text-xs text-gray-500">
											{dayjs(c.createdAt).format(
												"DD MMM, h:mm A"
											)}
										</span>
									</div>
									<p className="mt-1 text-gray-700">
										{c.content}
									</p>
								</div>
							))
						)}
					</div>
				</section>
			</motion.div>
		</div>
	);
};

export default EventDetails;
