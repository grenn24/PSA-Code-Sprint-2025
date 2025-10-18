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
	Trash,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "@common/types/event";
import eventService from "services/event";
import { useAppSelector } from "redux/store";
import { User } from "@common/types/user";

const EventDetails = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);
	const params = useParams();
	const [event, setEvent] = useState<Event | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [newComment, setNewComment] = useState("");
	const [participantSearch, setParticipantSearch] = useState("");
	const [isAddingComment, setIsAddingComment] = useState(false);
	const [isJoining, setIsJoining] = useState(false);
	const handleAddComment = async (content: string) => {
		if (!user?._id || !event?._id) return;
		setIsAddingComment(true);
		const newComment = {
			author: user?._id,
			content,
			createdAt: new Date(),
		};
		const newEvent = await eventService.updateEvent(event?._id, {
			comments: [...event.comments, newComment],
		});
		setIsAddingComment(false);
		setEvent(newEvent);
		setNewComment("");
	};

	useEffect(() => {
		if (!params.id) return;

		eventService.getEventByID(params.id).then((event) => {
			setEvent(event);
			setIsLoading(false);
		});
	}, [params.id]);

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
	const isJoined = !!event?.participants.find((participant) => {
		return (participant as User)._id === user._id;
	});
	const isCreator = event?.creator?._id === user._id;

	const handleToggleJoin = async () => {
		if (!user?._id || !event?._id) return;
		if (isCreator) {
			await eventService.deleteEventByID(event._id);
			navigate("/events-hub");
			return;
		}
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
				{!event.coverImage?.url && (
					<div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-400 animate-pulse" />
				)}

				<img
					src={event.coverImage?.url || ""}
					alt={event.title}
					className={`w-full h-full object-cover transition-opacity duration-500 ${
						event.coverImage?.url ? "opacity-100" : "opacity-0"
					}`}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
				<div className="absolute bottom-6 left-6 text-white flex items-center gap-4">
					{event.creator?.avatar && (
						<img
							src={event.creator.avatar}
							alt={event.creator.name}
							className="w-15 h-15 rounded-full object-cover border-2 border-white shadow-md"
						/>
					)}

					<div className="flex flex-col">
						{/* Event Title */}
						<h1 className="text-4xl font-bold font-inter leading-tight">
							{event.title}
						</h1>

						{/* Creator Name */}
						<p className="text-lg font-medium font-inter opacity-90 mt-1">
							Hosted by {event.creator?.name}
						</p>
					</div>
				</div>
				{/* Floating Join/Leave Button */}
				<motion.button
					whileTap={{ scale: 0.97 }}
					onClick={handleToggleJoin}
					disabled={isJoining}
					className={`absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white shadow-lg transition 
						${
							isJoined || isCreator
								? "bg-red-500/80 hover:bg-red-600"
								: "bg-indigo-600/80 hover:bg-indigo-700"
						} 
						${isJoining ? "opacity-70 cursor-wait" : ""}`}
				>
					{isCreator ? (
						<>
							<Trash size={18} />
							Delete Event
						</>
					) : isJoining ? (
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
				className="max-w-8xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-10"
			>
				{/* Left Column - Main Content */}
				<div className="flex-2 space-y-10">
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

					{/* Comments Section */}
					<section>
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<MessageSquare className="text-indigo-500" />
							Comments ({event.comments.length})
						</h2>

						{(isJoined || isCreator) && (
							<div className="bg-white rounded-xl p-4 shadow-sm mb-6 border border-gray-100">
								<textarea
									value={newComment}
									onChange={(e) =>
										setNewComment(e.target.value)
									}
									placeholder="Share your thoughts..."
									className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
									rows={3}
								/>
								<div className="flex justify-end mt-2">
									<button
										onClick={() =>
											handleAddComment(newComment)
										}
										disabled={
											isAddingComment ||
											!newComment.trim()
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

						<div className="space-y-4 pr-2">
							{event.comments.length === 0 ? (
								<p className="text-gray-500 italic">
									No comments yet.
								</p>
							) : (
								event.comments
									.sort((a, b) => {
										const timeA = a.createdAt
											? dayjs(a.createdAt).valueOf()
											: 0;
										const timeB = b.createdAt
											? dayjs(b.createdAt).valueOf()
											: 0;
										return timeB - timeA;
									})
									.map((c) => (
										<div
											key={c._id}
											className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition"
										>
											<div className="flex justify-between items-center">
												<p className="font-semibold text-gray-800">
													{c.author?.name}
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
				</div>

				{/* Right Column - Sidebar Info */}
				<aside className="flex-1 w-full lg:w-80 flex-shrink-0 space-y-6">
					<div className="bg-white rounded-4xl p-6 shadow-sm space-y-4 sticky top-6">
						{/* Date & Time */}
						<div className="flex items-center gap-3">
							<Calendar className="text-indigo-500" size={24} />
							<p className="text-xl font-semibold font-inter text-gray-800">
								{dayjs(event.startDate).format(
									"DD MMM YYYY, h:mm A"
								)}{" "}
								- {dayjs(event.endDate).format("h:mm A")}
							</p>
						</div>
						{event.mode === "offline" && (
							<div className="flex items-center gap-3">
								<MapPin className="text-green-500" size={24} />
								<p className="text-xl font-semibold font-inter text-gray-800">
									{event.location}
								</p>
							</div>
						)}

						{/* Participants */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold font-inter text-gray-800">
									Participants (
									{event.participants.length + 1})
								</h3>
								<input
									type="text"
									placeholder="Search participants"
									className="px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm font-inter"
									onChange={(e) =>
										setParticipantSearch(e.target.value)
									}
								/>
							</div>

							<div className="flex flex-wrap gap-3 max-h-140 overflow-y-auto">
								{[event.creator, ...event.participants]
									.filter((p: User) =>
										p.name
											.toLowerCase()
											.includes(
												participantSearch
													.trim()
													.toLowerCase()
											)
									)
									.map((participant: User) => (
										<div
											key={participant._id}
											className="flex items-center gap-2 bg-gray-100/70 rounded-xl px-3 py-1 shadow-sm"
										>
											<img
												src={participant.avatar}
												alt={participant.name}
												className="w-8 h-8 rounded-full object-cover border border-white"
											/>
											<span className="text-gray-800 font-medium font-inter text-sm">
												{participant.name}
											</span>
										</div>
									))}
							</div>
						</div>
					</div>
				</aside>
			</motion.div>
		</div>
	);
};

export default EventDetails;
