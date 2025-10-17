import React, { createElement, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
	HomeIcon as HomeOutline,
	BriefcaseIcon as BriefcaseOutline,
	UsersIcon as UsersOutline,
	CalendarIcon as CalendarOutline,
	ChatBubbleLeftRightIcon as ChatOutline,
	ArrowLeftIcon,
	ArrowRightIcon,
	PhoneIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

import {
	HomeIcon as HomeSolid,
	BriefcaseIcon as BriefcaseSolid,
	UsersIcon as UsersSolid,
	CalendarIcon as CalendarSolid,
	ChatBubbleLeftRightIcon as ChatSolid,
} from "@heroicons/react/24/solid";
import Header from "../components/Header";
import { useAppSelector } from "../redux/store";
import { MentorMatchContext } from "context/MentorMatchContext";
import { Chat } from "@common/types/chat";
import { WebsocketMessage } from "@common/types/http";
import websocketService from "utilities/websocket";
import userService from "services/user";
import chatService from "services/chat";
import { User } from "@common/types/user";
import { AnimatePresence, motion } from "framer-motion";
import VideoCall from "components/VideoCall";
import { VideoCallContext } from "context/VideoCallContext";

const routes = [
	{
		path: "/",
		label: "Homepage",
		outline: HomeOutline,
		filled: HomeSolid,
	},
	{
		path: "/career",
		label: "Career Roadmap",
		outline: BriefcaseOutline,
		filled: BriefcaseSolid,
	},
	{
		path: "/mentor",
		label: "Mentor Match",
		outline: UsersOutline,
		filled: UsersSolid,
	},
	{
		path: "/events-hub",
		label: "Events Hub",
		outline: CalendarOutline,
		filled: CalendarSolid,
	},
	{
		path: "/wellness-buddy",
		label: "WellnessBuddy",
		outline: ChatOutline,
		filled: ChatSolid,
	},
];

const MainLayout = () => {
	const { user } = useAppSelector((state) => state.user);
	const [open, setOpen] = useState(true);
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const [chats, setChats] = useState<Chat[]>([]);
	const [localStream, setLocalStream] = useState<MediaStream | null>(null);
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
	const [targetUser, setTargetUser] = useState<User | null>(null);

	const [videoCallOffer, setVideoCallOffer] = useState<{
		offer: RTCSessionDescriptionInit;
		chat: Chat;
	} | null>(null);
	const videoCallOfferSource: User | undefined =
		videoCallOffer?.chat.participants.find((p) => p._id !== user?._id);

	useEffect(() => {
		if (!isAuthenticated && location.pathname !== "/log-in") {
			window.location.href = "/log-in";
		}
	}, [isAuthenticated, location.pathname]);

	useEffect(() => {
		if (!user?._id) return;
		userService.getChats(user._id).then((chats) => setChats(chats));

		const handleNewChatMessage = (message: WebsocketMessage) => {
			if (message.type === "NEW_CHAT_MESSAGE") {
				setChats((prevChats) =>
					prevChats.map((chat) =>
						chat._id === message.data?.chatID
							? { ...chat, messages: [] }
							: chat
					)
				);
			}
		};

		const handleChatMessageUpdate = (message: WebsocketMessage) => {
			if (message.type !== "CHAT_MESSAGE_UPDATE") return;
			const updatedMessage = message.data?.message;
			const chatID = message.data?.chatID;
			if (!updatedMessage || !chatID) return;

			setChats((prevChats) =>
				prevChats.map((chat) =>
					chat._id?.toString() !== chatID.toString()
						? chat
						: {
								...chat,
								messages: chat.messages.map((m) =>
									m._id?.toString() ===
									updatedMessage._id.toString()
										? updatedMessage
										: m
								),
						  }
				)
			);
		};

		const handleSelectedRecipientStatusUpdate = (
			message: WebsocketMessage
		) => {
			if (message.type !== "USER_STATUS_UPDATE" || !message.data?._id)
				return;

			setChats((prevChats) =>
				prevChats.map((chat) => {
					const hasUser = chat.participants.some(
						(p) => p._id === message.data._id
					);
					if (!hasUser) return chat;
					return {
						...chat,
						participants: chat.participants.map((p) =>
							p._id === message.data._id ? message.data : p
						),
					};
				})
			);
		};

		const handleChatRead = (message: WebsocketMessage) => {
			if (message.type !== "CHAT_MESSAGE_READ") return;
			setChats((prevChats) =>
				prevChats.map((chat) =>
					chat._id === message.data?._id ? message.data : chat
				)
			);
		};

		const handleVideoCallOffer = (message: WebsocketMessage) => {
			if (message.type !== "offer_video_call") return;
			setVideoCallOffer({
				offer: message.data,
				chat: message.chat,
			});
		};

		const handleICECandidate = (message: WebsocketMessage) => {
			if (message.type !== "establish_connection") return;
			chatService.addICECandidate(message.data);
		};

		const handleEndVideoCall = async (message: WebsocketMessage) => {
			if (message.type !== "end_video_call") return;
			if (
				user?._id &&
				user?.mentors.find((mentee) => mentee._id === targetUser?._id)
			) {
				await userService.addActivity(user?._id, {
					type: "mentorMessage",
					date: new Date(),
				});
			}
		};

		websocketService.addListeners([
			handleNewChatMessage,
			handleSelectedRecipientStatusUpdate,
			handleChatRead,
			handleChatMessageUpdate,
			handleVideoCallOffer,
			handleICECandidate,
			handleEndVideoCall,
		]);

		chatService.onLocalStream = setLocalStream;
		chatService.onRemoteStream = setRemoteStream;
		return () => {
			websocketService.removeListeners([
				handleNewChatMessage,
				handleSelectedRecipientStatusUpdate,
				handleChatRead,
				handleChatMessageUpdate,
				handleVideoCallOffer,
				handleICECandidate,
				handleEndVideoCall,
			]);
		};
	}, []);

	return (
		<div className="flex flex-col md:flex-row h-screen w-screen bg-gray-50">
			<motion.div
				initial={{ width: 300 }}
				animate={{ width: open ? 300 : 80 }}
				transition={{ type: "spring", stiffness: 200, damping: 25 }}
				className="hidden md:flex bg-white shadow-lg flex-col border-r border-gray-200 pb-2"
			>
				<div className="flex justify-center p-4">
					<img src="/images/psa-logo.png" alt="PSA" className="h-6" />
				</div>
				<nav className="flex-1 p-2 space-y-1 relative">
					{routes.map((r, idx) => {
						const isActive = location.pathname === r.path;
						const Icon = isActive ? r.filled : r.outline;
						return (
							<div key={idx} className="relative group">
								<button
									onClick={() => {
										navigate(r.path);
										setOpen(false);
									}}
									className={`flex items-center w-full px-3 py-2 rounded-xl gap-6 font-medium transition-colors duration-200 ${
										open
											? "justify-start"
											: "justify-center"
									} ${
										isActive
											? "bg-indigo-100 text-indigo-700"
											: "text-gray-700 hover:bg-gray-100 hover:font-semibold"
									}`}
								>
									<Icon className="w-8 h-8 min-w-8 min-h-8" />
									<AnimatePresence>
										{open && (
											<motion.span
												initial={false}
												animate={{
													opacity: 1,
													width: "auto",
												}}
												exit={{
													opacity: 0,
													width: 0,
												}}
												transition={{ duration: 0.25 }}
												className="font-inter text-lg whitespace-nowrap"
											>
												{r.label}
											</motion.span>
										)}
									</AnimatePresence>
								</button>

								{!open && (
									<span className="absolute z-100 left-17 top-1/2 -translate-y-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
										{r.label}
									</span>
								)}
							</div>
						);
					})}
				</nav>

				<button
					className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0 m-auto"
					onClick={() => setOpen(!open)}
				>
					{open ? (
						<ArrowLeftIcon className="w-6 h-6 text-gray-600" />
					) : (
						<ArrowRightIcon className="w-6 h-6 text-gray-600" />
					)}
				</button>
			</motion.div>

			<MentorMatchContext value={{ chats, setChats }}>
				<VideoCallContext
					value={{
						localStream,
						remoteStream,
						setLocalStream,
						setRemoteStream,
						targetUser,
						setTargetUser,
					}}
				>
					<div className="flex flex-col h-dvh w-screen overflow-hidden">
						<Header />
						<main className="flex-1 overflow-y-auto">
							<Outlet />
						</main>
						<div className="w-full bg-white border-t border-gray-200 flex justify-around py-1 md:hidden z-50">
							{routes.map((r, idx) => {
								const isActive = location.pathname === r.path;
								const Icon = isActive ? r.filled : r.outline;

								return (
									<button
										key={idx}
										onClick={() => navigate(r.path)}
										className={`flex flex-col items-center text-xs px-3 py-2 rounded-xl transition ${
											isActive
												? "bg-indigo-50 text-indigo-600"
												: "text-gray-600 hover:text-indigo-500"
										}`}
									>
										<Icon className="w-6 h-6" />
										<span className="text-[11px] font-medium leading-3">
											{r.label}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</VideoCallContext>
			</MentorMatchContext>
			<AnimatePresence>
				{videoCallOffer && videoCallOfferSource && (
					<motion.div
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 100 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
						className="fixed top-4 right-4 z-50 w-64 bg-white/90 rounded-2xl p-4 flex flex-col items-center space-y-2 shadow-lg"
					>
						<h2 className="text-gray-900 text-lg font-bold">
							{videoCallOfferSource.name}
						</h2>
						<span className="text-gray-600 text-sm">
							Video Call
						</span>
						<img
							src={videoCallOfferSource.avatar}
							alt={videoCallOfferSource.name}
							className="w-16 h-16 rounded-full border-2 border-gray-200"
						/>
						<div className="flex space-x-4 mt-2">
							<div className="relative group">
								<button
									className="bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-lg"
									onClick={() => {
										if (
											!videoCallOffer.chat._id ||
											!videoCallOfferSource._id
										)
											return;
										chatService.answerVideoCall(
											videoCallOfferSource._id,
											videoCallOffer.chat._id,
											videoCallOffer.offer
										);
										setTargetUser(videoCallOfferSource);
										setVideoCallOffer(null);
									}}
								>
									<PhoneIcon className="w-5 h-5 text-white" />
								</button>
								<span className="absolute -top-[-40px] z-1 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
									Answer
								</span>
							</div>

							<div className="relative group">
								<button
									className="bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg"
									onClick={() => setVideoCallOffer(null)}
								>
									<XMarkIcon className="w-5 h-5 text-white" />
								</button>
								<span className="absolute -top-[-40px] z-1 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
									Decline
								</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			{localStream && remoteStream && (
				<VideoCall
					targetUser={targetUser}
					localStream={localStream}
					remoteStream={remoteStream}
					onEndCall={() => {
						if (!targetUser?._id) return;
						chatService.endVideoCall(targetUser?._id);
						setTargetUser(null);
						if (
							user?._id &&
							user?.mentors.find(
								(mentee) => mentee._id === targetUser?._id
							)
						) {
							userService.addActivity(user?._id, {
								type: "mentorVideoCall",
								date: new Date(),
							});
						}
					}}
				/>
			)}
		</div>
	);
};

export default MainLayout;
