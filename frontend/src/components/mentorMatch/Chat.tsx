import { useState } from "react";
import { motion } from "framer-motion";

const dummyChats = [
	{
		id: 1,
		name: "Sophia Tan",
		lastMessage: "Looking forward to our next session!",
		messages: [
			{ sender: "mentor", text: "Hi! How's your progress?" },
			{ sender: "user", text: "Going well, thanks!" },
		],
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		id: 2,
		name: "Marcus Lee",
		lastMessage: "Don't forget to review the report.",
		messages: [
			{ sender: "mentor", text: "Please review the report by tomorrow." },
			{ sender: "user", text: "Got it, thanks!" },
		],
		avatar: "https://randomuser.me/api/portraits/men/33.jpg",
	},
];

const Chat = () => {
	const [selectedChat, setSelectedChat] = useState(null);
	const [input, setInput] = useState("");

	const sendMessage = () => {
		if (input.trim() === "" || !selectedChat) return;

		selectedChat.messages.push({ sender: "user", text: input });
		setInput("");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -15 }}
			className="flex flex-col sm:flex-row h-full bg-white shadow-lg rounded-2xl overflow-hidden"
		>
			{/* Chat List */}
			<div className="w-full sm:w-1/3 border-r border-gray-200 overflow-y-auto">
				{dummyChats.map((chat) => (
					<div
						key={chat.id}
						onClick={() => setSelectedChat(chat)}
						className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
							selectedChat?.id === chat.id
								? "bg-indigo-50"
								: "hover:bg-gray-50"
						}`}
					>
						<img
							src={chat.avatar}
							alt={chat.name}
							className="w-12 h-12 rounded-full object-cover"
						/>
						<div className="flex-1">
							<h3 className="font-medium text-gray-800">
								{chat.name}
							</h3>
							<p className="text-sm text-gray-500 truncate">
								{chat.lastMessage}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Chat Window */}
			<div className="flex-1 flex flex-col">
				{selectedChat ? (
					<>
						<div className="flex-1 p-4 overflow-y-auto space-y-3">
							{selectedChat.messages.map((msg, i) => (
								<div
									key={i}
									className={`flex ${
										msg.sender === "user"
											? "justify-end"
											: "justify-start"
									}`}
								>
									<div
										className={`px-4 py-2 rounded-2xl max-w-[70%] ${
											msg.sender === "user"
												? "bg-green-100 text-green-800 rounded-br-none"
												: "bg-gray-100 text-gray-800 rounded-bl-none"
										}`}
									>
										{msg.text}
									</div>
								</div>
							))}
						</div>
						<div className="p-4 border-t border-gray-200 flex gap-2">
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type a message..."
								className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
								onKeyDown={(e) =>
									e.key === "Enter" && sendMessage()
								}
							/>
							<button
								onClick={sendMessage}
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

export default Chat;
