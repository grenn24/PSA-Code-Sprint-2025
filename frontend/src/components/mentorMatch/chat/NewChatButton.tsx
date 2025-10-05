import { Chat } from "@common/types/chat";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/store";
import chatService from "services/chat";
import userService from "services/user";

interface Prop {
	chats: Chat[];
	setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
	setSelectedChatID: React.Dispatch<React.SetStateAction<string | null>>;
}
const NewChatButton = ({ chats, setChats, setSelectedChatID }: Prop) => {
	const { user } = useAppSelector((state) => state.user);

	const newChatDropdownRef = useRef<HTMLDivElement>(null);
	const [showNewChat, setShowNewChat] = useState(false);
	const [searchMentorValue, setSearchMentorValue] = useState("");

	const handleNewChatClick = async (recipientID: string) => {
		const existingChat = chats.find((chat) =>
			chat.participants.some((p) => p._id === recipientID)
		);

		if (existingChat?._id) {
			setSelectedChatID(existingChat._id);
		} else if (user?._id) {
			// create new chat
			const newChat = await chatService.createChat([
				user._id,
				recipientID,
			]);
			setChats((prev) => [...prev, newChat]);
			setSelectedChatID(newChat._id!);
		}
		setShowNewChat(false);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setShowNewChat((prev) => !prev)}
				className="p-2 rounded-full hover:bg-gray-100 transition"
			>
				<PlusIcon className="w-5 h-5 text-gray-600" />
			</button>
			<AnimatePresence>
				{showNewChat && (
					<motion.div
						ref={newChatDropdownRef}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="absolute right-0 mt-2 w-64 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50 p-2"
					>
						<div className="relative mb-3">
							<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							<input
								type="text"
								value={searchMentorValue}
								onChange={(e) =>
									setSearchMentorValue(e.target.value)
								}
								placeholder="Search mentors/mentees"
								className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>

						{/* All Mentors */}
						<p className="text-sm font-medium text-gray-500 mb-2">
							All Mentors
						</p>
						<div className="max-h-64 overflow-y-auto">
							{user?.mentors
								.filter((m) =>
									m.name
										.toLowerCase()
										.includes(
											searchMentorValue.toLowerCase()
										)
								)
								.map((mentor) => (
									<div
										key={mentor._id}
										onClick={() => {
											if (mentor._id) {
												handleNewChatClick(mentor._id);
											}
										}}
										className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
									>
										<img
											src={mentor.avatar}
											alt={mentor.name}
											className="w-10 h-10 rounded-full object-cover"
										/>
										<span>{mentor.name}</span>
									</div>
								))}
						</div>

						{/* All Mentees */}
						<p className="text-sm font-medium text-gray-500 mb-2 mt-4">
							All Mentees
						</p>
						<div className="max-h-64 overflow-y-auto">
							{user?.mentees
								.filter((m) =>
									m.name
										.toLowerCase()
										.includes(
											searchMentorValue.toLowerCase()
										)
								)
								.map((mentee) => (
									<div
										key={mentee._id}
										onClick={() => {
											if (mentee._id) {
												handleNewChatClick(mentee._id);
											}
										}}
										className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
									>
										<img
											src={mentee.avatar}
											alt={mentee.name}
											className="w-10 h-10 rounded-full object-cover"
										/>
										<span>{mentee.name}</span>
									</div>
								))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default NewChatButton;
