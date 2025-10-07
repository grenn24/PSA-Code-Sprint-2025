import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Chat } from "@common/types/chat";
import userService from "services/user";
import { useAppDispatch, useAppSelector } from "redux/store";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import chatService from "services/chat";
import websocketService from "utilities/websocket";
import { WebsocketMessage } from "@common/types/http";
import NewChatButton from "./chat/NewChatButton";
import ChatWindow from "./chat/ChatWindow";
import { setUser } from "redux/slices/user";
import { useMentorMatchContext } from "context/MentorMatchContext";

const Chats = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const { chats, setChats } = useMentorMatchContext();
	const [selectedChatID, setSelectedChatID] = useState<string | null>(null);
	const selectedChatMessages = chats.find(
		(c) => c._id === selectedChatID
	)?.messages;
	const [searchChatValue, setSearchChatValue] = useState("");
	const [showNewChat, setShowNewChat] = useState(false);
	const newChatDropdownRef = useRef<HTMLDivElement>(null);
	const expandedChatRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (expandedChatRef.current) {
			expandedChatRef.current.scrollTop =
				expandedChatRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (!user?._id) return;
		userService.getChats(user._id).then((chats) => setChats(chats));
		userService
			.getUserByID(user._id)
			.then((user) => dispatch(setUser(user)));
	}, []);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				newChatDropdownRef.current &&
				!newChatDropdownRef.current.contains(event.target as Node)
			) {
				setShowNewChat(false);
			}
		}
		if (showNewChat)
			document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [showNewChat]);



	useEffect(() => {
		scrollToBottom();
	}, [selectedChatID, selectedChatMessages?.length]);

	useEffect(() => {
		if (!selectedChatID) {
			return;
		}
		chatService
			.markMessagesAsRead(selectedChatID)
			.then((updatedChat) =>
				setChats((prevChats) =>
					prevChats.map((chat) =>
						chat._id === updatedChat._id ? updatedChat : chat
					)
				)
			);
	}, [selectedChatID, selectedChatMessages?.length]);

	const filteredChats = chats.filter((chat) => {
		const recipient = chat.participants.find((u) => u._id !== user?._id);
		return recipient?.name
			.toLowerCase()
			.includes(searchChatValue.trim().toLowerCase());
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -15 }}
			className="flex flex-col sm:flex-row h-full bg-white shadow-lg rounded-2xl overflow-hidden"
		>
			{/* Chat List */}
			<div className="w-full sm:w-1/3 border-r border-gray-200 flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
					<h2 className="text-xl font-bold text-gray-800">
						Chats ({chats.length})
					</h2>
					<div className="flex items-center gap-2">
						<NewChatButton
							chats={chats}
							setChats={setChats}
							setSelectedChatID={setSelectedChatID}
						/>
						<button className="p-2 rounded-full hover:bg-gray-100 transition">
							<FunnelIcon className="w-5 h-5 text-gray-600" />
						</button>
					</div>
				</div>

				{/* Search Input */}
				<div className="px-4 py-2 border-b border-gray-200">
					<div className="relative">
						<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							type="text"
							value={searchChatValue}
							onChange={(e) => setSearchChatValue(e.target.value)}
							placeholder="Search chats"
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
						/>
					</div>
				</div>

				{/* Chat Items */}
				<div className="flex-1 overflow-y-auto">
					{filteredChats.map((chat) => {
						const recipient = chat.participants.find(
							(u) => u._id !== user?._id
						);
						if (!recipient || !chat._id) return null;
						return (
							<div
								key={chat._id}
								onClick={() => {
									if (!chat._id) return;
									setSelectedChatID(chat._id);
								}}
								className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
									selectedChatID === chat._id
										? "bg-indigo-50"
										: "hover:bg-gray-50"
								}`}
							>
								<img
									src={recipient.avatar}
									alt={recipient.name}
									className="w-12 h-12 rounded-full object-cover"
								/>
								<div className="flex-1">
									<h3 className="font-medium text-gray-800">
										{recipient.name}
									</h3>
									<p className="text-sm text-gray-500 truncate">
										{
											chat.messages?.[
												chat.messages.length - 1
											]?.content
										}
									</p>
								</div>
								<span
									className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
										user?.mentees.find(
											(mentee) =>
												mentee._id === recipient._id
										)
											? "bg-green-100 text-green-800"
											: "bg-blue-100 text-blue-800"
									}`}
								>
									{user?.mentees.find(
										(mentee) => mentee._id === recipient._id
									)
										? "Mentee"
										: "Mentor"}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			{
				<ChatWindow
					selectedChatID={selectedChatID}
					chats={chats}
					setChats={setChats}
				/>
			}
		</motion.div>
	);
};

export default Chats;
