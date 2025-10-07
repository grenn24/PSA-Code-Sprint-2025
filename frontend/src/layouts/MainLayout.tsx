import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
	HomeIcon,
	BriefcaseIcon,
	UserIcon,
	UsersIcon,
	CalendarIcon,
	ChatBubbleLeftRightIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import { useAppSelector } from "../redux/store";
import { MentorMatchContext } from "context/MentorMatchContext";
import { Chat } from "@common/types/chat";
import { WebsocketMessage } from "@common/types/http";
import websocketService from "utilities/websocket";
import userService from "services/user";

const routes = [
	{ path: "/", label: "Homepage", icon: <HomeIcon className="w-6 h-6" /> },
	{
		path: "/career",
		label: "Career Roadmap",
		icon: <BriefcaseIcon className="w-6 h-6" />,
	},
	{
		path: "/profile",
		label: "Profile Page",
		icon: <UserIcon className="w-6 h-6" />,
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
				setChats((prevChats) => {
					const newChats = prevChats.map((chat) => {
						if (chat._id === message.data?.chatID) {
							return {
								...chat,
								messages: [],
							};
						}
						return chat;
					});
					return newChats;
				});
			}
		};
		const handleChatMessageUpdate = (message: WebsocketMessage) => {
			if (message.type !== "CHAT_MESSAGE_UPDATE") return;

			const updatedMessage = message.data?.message;
			const chatID = message.data?.chatID;

			if (!updatedMessage || !chatID) return;

			setChats((prevChats) =>
				prevChats.map((chat) => {
					if (chat._id?.toString() !== chatID.toString()) return chat;
					const updatedMessages = chat.messages.map((m) => {
						return m._id?.toString() ===
							updatedMessage._id.toString()
							? updatedMessage
							: m;
					});

					return { ...chat, messages: updatedMessages };
				})
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
						participants: chat.participants.map((participant) =>
							participant._id === message.data._id
								? message.data
								: participant
						),
					};
				})
			);
		};

		const handleChatRead = (message: WebsocketMessage) => {
			if (message.type !== "CHAT_MESSAGE_READ") return;
			setChats((prevChats) =>
				prevChats.map((chat) => {
					if (chat._id === message.data?._id) {
						return message.data;
					}
					return chat;
				})
			);
		};

		websocketService.addListeners([
			handleNewChatMessage,
			handleSelectedRecipientStatusUpdate,
			handleChatRead,
			handleChatMessageUpdate,
		]);
		return () => {
			websocketService.removeListeners([
				handleNewChatMessage,
				handleSelectedRecipientStatusUpdate,
				handleChatRead,
				handleChatMessageUpdate,
			]);
		};
	}, []);

	return (
		<div className="flex h-screen w-screen bg-gray-50">
			<div
				className={`${
					open ? "min-w-64" : "w-20"
				} bg-white shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200 pb-2`}
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
									className={`flex items-center w-full px-3 py-2 rounded-lg transition
                    ${open ? "justify-start" : "justify-center"}
                    ${
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
			<MentorMatchContext value={{ chats, setChats }}>
				<div className="flex flex-col flex-1 h-full">
					<Header />
					<main className="h-full overflow-y-auto">
						<Outlet />
					</main>
				</div>
			</MentorMatchContext>
		</div>
	);
};

export default MainLayout;
