import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Chat } from "@common/types/chat";
import userService from "services/user";
import { useAppSelector } from "redux/store";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import chatService from "services/chat";
import websocketService from "utilities/websocket";
import { WebsocketMessage } from "@common/types/http";
import MessageBubble from "./chat/MessageBubble";
import ChatHeader from "./chat/ChatHeader";
import NewChatButton from "./chat/NewChatButton";
import { ChatMenuButton } from "./chat/ChatMenuButton";

const Chats = () => {
	const { user: initialUser } = useAppSelector((state) => state.user);
	const [user, setUser] = useState(initialUser);
	const [chats, setChats] = useState<Chat[]>([]);
	const [selectedChatID, setSelectedChatID] = useState<string | null>(null);
	const selectedChatRecipient = chats
		.find((chat) => chat._id === selectedChatID)
		?.participants.find((participant) => participant._id !== user?._id);
	const selectedChatMessages = chats.find(
		(c) => c._id === selectedChatID
	)?.messages;
	const [searchChatValue, setSearchChatValue] = useState("");
	const [messageInput, setMessageInput] = useState("");
	const [showNewChat, setShowNewChat] = useState(false);
	const newChatDropdownRef = useRef<HTMLDivElement>(null);
	const expandedChatRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (expandedChatRef.current) {
			expandedChatRef.current.scrollTop =
				expandedChatRef.current.scrollHeight;
		}
	};

	const sendMessage = async (content: string) => {
		if (!user?._id || !selectedChatID) return;

		const message = await chatService.postMessage(selectedChatID, {
			senderID: user._id,
			content,
			createdAt: new Date(),
		});

		setChats((prevChats) => {
			const newChats = prevChats.map((chat) => {
				if (chat._id === selectedChatID) {
					return {
						...chat,
						messages: [...chat.messages, message],
					};
				}
				return chat;
			});
			return newChats;
		});
		setMessageInput("");
	};

	useEffect(() => {
		if (!user?._id) return;
		userService.getChats(user._id).then((chats) => setChats(chats));
		userService.getUserByID(user._id).then(setUser);
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
		const handleNewChatMessage = (message: WebsocketMessage) => {
			if (message.type === "CHAT_MESSAGE") {
				setChats((prevChats) => {
					const newChats = prevChats.map((chat) => {
						if (chat._id === message.data?.chatID) {
							return {
								...chat,
								messages: [
									...chat.messages,
									message.data?.message,
								],
							};
						}
						return chat;
					});
					return newChats;
				});
			}
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
		]);
		return () => {
			websocketService.removeListeners([
				handleNewChatMessage,
				handleSelectedRecipientStatusUpdate,
				handleChatRead,
			]);
		};
	}, [chats]);

	useEffect(() => {
		scrollToBottom();
	}, [selectedChatID, selectedChatMessages]);

	useEffect(() => {
		if (!selectedChatID) {
			return;
		}
		chatService.markMessagesAsRead(selectedChatID);
	}, [selectedChatID, selectedChatMessages]);

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
					<h2 className="text-lg font-semibold text-gray-800">
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
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500"
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

			{/* Chat Window */}
			<div
				className={`flex-1 flex flex-col items-center bg-${
					user?.mentees.find(
						(mentee) => mentee._id === selectedChatRecipient?._id
					)
						? "gray"
						: "gray"
				}-50`}
			>
				{selectedChatID && selectedChatRecipient ? (
					<>
						<ChatHeader
							recipient={selectedChatRecipient}
							type={
								user?.mentees.find(
									(mentee) =>
										mentee._id === selectedChatRecipient._id
								)
									? "mentee"
									: "mentor"
							}
						/>
						<div
							ref={expandedChatRef}
							className="w-full flex-1 p-4 overflow-y-auto space-y-3 max-w-4xl"
						>
							{chats
								.find((c) => c._id === selectedChatID)
								?.messages.map((msg) => {
									const isSender = msg.sender === user?._id;
									return (
										<MessageBubble
											key={msg._id}
											isSender={isSender}
											message={msg}
										/>
									);
								})}
						</div>
						<div className="bg-white w-full p-2 border-t border-gray-200 flex gap-2">
							<ChatMenuButton recipient={selectedChatRecipient} />
							<input
								value={messageInput}
								onChange={(e) =>
									setMessageInput(e.target.value)
								}
								placeholder="Type a message"
								className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
								onKeyDown={(e) =>
									e.key === "Enter" &&
									sendMessage(messageInput)
								}
							/>
							<button
								onClick={() => sendMessage(messageInput)}
								className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
							>
								Send
							</button>
						</div>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
						Select a chat to start messaging
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Chats;
