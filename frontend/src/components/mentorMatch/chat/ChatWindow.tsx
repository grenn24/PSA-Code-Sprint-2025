import React, { useEffect } from "react";
import { ChatMenuButton } from "./ChatMenuButton";
import { useAppSelector } from "redux/store";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import { Chat, Message } from "@common/types/chat";
import chatService from "services/chat";

interface Prop {
	selectedChatID: string | null;
	chats: Chat[];
	setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ChatWindow = ({ selectedChatID, chats, setChats }: Prop) => {
	const { user } = useAppSelector((state) => state.user);
	const [messageInput, setMessageInput] = React.useState("");
	const expandedChatRef = React.useRef<HTMLDivElement>(null);

	const recipient = chats
		.find((chat) => chat._id === selectedChatID)
		?.participants.find((participant) => participant._id !== user?._id);

	const selectedChatMessages =
		chats.find((c) => c._id === selectedChatID)?.messages || [];

	const groupMessagesByDate = (messages: any[]) => {
		const groups: Record<string, any[]> = {};
		messages.forEach((msg) => {
			const date = new Date(msg.createdAt).toDateString();
			if (!groups[date]) groups[date] = [];
			groups[date].push(msg);
		});
		return groups;
	};

	const sendMessage = async (
		content: string,
		type: Message["type"] = "text",
		metadata: Record<string, any> = {}
	) => {
		if (!user?._id || !selectedChatID || (type === "text" && !content.trim())) return;

		const message = await chatService.postMessage(selectedChatID, {
			sender: user._id,
			content,
			type,
			metadata,
			createdAt: new Date(),
		});

		setChats((prevChats) =>
			prevChats.map((chat) =>
				chat._id === selectedChatID
					? { ...chat, messages: [...chat.messages, message] }
					: chat
			)
		);
		setMessageInput("");
	};

	const updateMessage = async (
		messageID: string,
		data: {
			content: string;
			type?: Message["type"];
			metadata?: Record<string, any>;
		}
	) => {
		if (!user?._id || !selectedChatID) return;
		const message = await chatService.updateMessage(
			messageID,
			selectedChatID,
			data
		);
		setChats((prevChats) =>
			prevChats.map((chat) =>
				chat._id === selectedChatID
					? {
							...chat,
							messages: chat.messages.map((m) =>
								m._id === messageID ? message : m
							),
					  }
					: chat
			)
		);
	};

	const scrollToBottom = () => {
		if (expandedChatRef.current) {
			expandedChatRef.current.scrollTop =
				expandedChatRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [selectedChatID, selectedChatMessages?.length]);

	const groupedMessages = groupMessagesByDate(selectedChatMessages);

	return (
		<div
			className={`flex-1 flex flex-col items-center bg-${
				user?.mentees.find((mentee) => mentee._id === recipient?._id)
					? "gray"
					: "gray"
			}-50`}
		>
			{selectedChatID && recipient ? (
				<>
					<ChatHeader
						recipient={recipient}
						type={
							user?.mentees.find(
								(mentee) => mentee._id === recipient._id
							)
								? "mentee"
								: "mentor"
						}
						chatID={selectedChatID}
					/>

					<div
						ref={expandedChatRef}
						className="w-full flex-1 p-4 overflow-y-auto space-y-3 max-w-4xl"
					>
						{Object.entries(groupedMessages).map(([date, msgs]) => (
							<div key={date} className="relative">
								<div className="sticky top-0 z-10 flex justify-center mb-2">
									<span className="backdrop-blur-md bg-white/70 border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-xs">
										{date === new Date().toDateString()
											? "Today"
											: date ===
											  new Date(
													Date.now() - 86400000
											  ).toDateString()
											? "Yesterday"
											: date}
									</span>
								</div>

								<div className="space-y-2">
									{msgs.map((msg) => {
										const isSender =
											msg.sender === user?._id;
										return (
											<MessageBubble
												key={msg._id}
												isSender={isSender}
												message={msg}
												updateMessage={updateMessage}
											/>
										);
									})}
								</div>
							</div>
						))}
					</div>

					<div className="bg-white w-full p-2 border-t border-gray-200 flex gap-2">
						<ChatMenuButton
							recipient={recipient}
							sendMessage={sendMessage}
						/>
						<input
							value={messageInput}
							onChange={(e) => setMessageInput(e.target.value)}
							placeholder="Type a message"
							className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
							onKeyDown={(e) =>
								e.key === "Enter" && sendMessage(messageInput)
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
	);
};

export default ChatWindow;
