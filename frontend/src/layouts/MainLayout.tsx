import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
	HomeIcon,
	BriefcaseIcon,
	UsersIcon,
	CalendarIcon,
	ChatBubbleLeftRightIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	PhoneIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
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

const routes = [
	{ path: "/", label: "Homepage", icon: <HomeIcon className="w-6 h-6" /> },
	{
		path: "/career",
		label: "Career Roadmap",
		icon: <BriefcaseIcon className="w-6 h-6" />,
	},
	{
		path: "/mentor",
		label: "Mentor Match",
		icon: <UsersIcon className="w-6 h-6" />,
	},
	{
		path: "/events",
		label: "Events",
		icon: <CalendarIcon className="w-6 h-6" />,
	},
	{
		path: "/wellness-buddy",
		label: "WellnessBuddy",
		icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
	},
];

const MainLayout = () => {
	const { user } = useAppSelector((state) => state.user);
	const [open, setOpen] = useState(true);
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const [chats, setChats] = useState<Chat[]>([]);
	const [videoCall, setVideoCall] = useState<{
		localStream: MediaStream | null;
		remoteStream: MediaStream | null;
	}>({
		localStream: null,
		remoteStream: null,
	});

	const [videoCallOffer, setVideoCallOffer] = useState<{
		offer: RTCSessionDescriptionInit;
		chat: Chat;
	} | null>(null);
	const videoCallSource: User | undefined =
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

		websocketService.addListeners([
			handleNewChatMessage,
			handleSelectedRecipientStatusUpdate,
			handleChatRead,
			handleChatMessageUpdate,
			handleVideoCallOffer,
			handleICECandidate,
		]);

		chatService.onLocalStream = (localStream) =>
			setVideoCall(videoCall => ({ ...videoCall, localStream }));
		chatService.onRemoteStream = (remoteStream) =>
			setVideoCall(videoCall => ({ ...videoCall, remoteStream }));
		return () => {
			websocketService.removeListeners([
				handleNewChatMessage,
				handleSelectedRecipientStatusUpdate,
				handleChatRead,
				handleChatMessageUpdate,
				handleVideoCallOffer,
				handleICECandidate,
			]);
		};
	}, []);

	console.log(videoCall);
	return (
		<div className="flex flex-col md:flex-row h-screen w-screen bg-gray-50">
			{/* Sidebar (hidden on mobile) */}
			<div
				className={`${
					open ? "min-w-64" : "w-20"
				} hidden md:flex bg-white shadow-lg transition-all duration-300 flex-col border-r border-gray-200 pb-2`}
			>
				<div className="flex justify-center p-4">
					<img src="/images/psa-logo.png" alt="PSA" className="h-6" />
				</div>

				<nav className="flex-1 p-2 space-y-1 relative">
					{routes.map((r, idx) => {
						const isActive = location.pathname === r.path;
						return (
							<div key={idx} className="relative group">
								<button
									onClick={() => navigate(r.path)}
									className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
										open
											? "justify-start"
											: "justify-center"
									} ${
										isActive
											? "bg-blue-100 text-blue-700"
											: "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
									}`}
								>
									<div className="flex-shrink-0">
										{r.icon}
									</div>
									<span
										className={`font-medium whitespace-nowrap transition-all duration-200 ${
											open
												? "ml-3 opacity-100 w-auto"
												: "opacity-0 w-0 absolute pointer-events-none"
										}`}
									>
										{r.label}
									</span>
								</button>

								{!open && (
									<div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-md bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
										{r.label}
									</div>
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
			</div>

			{/* Mobile bottom navigation */}
			<div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 md:hidden z-50">
				{routes.map((r, idx) => {
					const isActive = location.pathname === r.path;
					return (
						<button
							key={idx}
							onClick={() => navigate(r.path)}
							className={`flex flex-col items-center text-xs ${
								isActive ? "text-blue-600" : "text-gray-600"
							}`}
						>
							{r.icon}
							<span>{r.label}</span>
						</button>
					);
				})}
			</div>

			{/* Main content */}
			<MentorMatchContext value={{ chats, setChats }}>
				<div className="flex flex-col flex-1 h-full overflow-hidden">
					<Header />
					<main className="flex-1 overflow-y-auto">
						<Outlet />
					</main>
				</div>
			</MentorMatchContext>
			<AnimatePresence>
				{videoCallOffer && videoCallSource && (
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
							{videoCallSource.name}
						</h2>
						<span className="text-gray-600 text-sm">
							Video Call
						</span>
						<img
							src={videoCallSource.avatar}
							alt={videoCallSource.name}
							className="w-16 h-16 rounded-full border-2 border-gray-200"
						/>
						<div className="flex space-x-4 mt-2">
							<div className="relative group">
								<button
									className="bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-lg"
									onClick={() => {
										if (
											!videoCallOffer.chat._id ||
											!videoCallSource._id
										)
											return;
										chatService.answerVideoCall(
											videoCallSource._id,
											videoCallOffer.chat._id,
											videoCallOffer.offer
										);
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
			{videoCall.localStream && videoCall.remoteStream && (
				<VideoCall
					localStream={videoCall.localStream}
					remoteStream={videoCall.remoteStream}
				/>
			)}
		</div>
	);
};

export default MainLayout;
