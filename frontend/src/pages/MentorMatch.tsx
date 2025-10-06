import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopMatches from "../components/mentorMatch/TopMatches";
import Explore from "../components/mentorMatch/Explore";
import PendingInvites from "../components/mentorMatch/Invites";
import Chat from "../components/mentorMatch/Chat";
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { setUser } from "redux/slices/user";
import { Chat as ChatType } from "@common/types/chat";
import { MentorMatchContext } from "context/MentorMatchContext";
import { useSearchParams, useNavigate } from "react-router-dom"; // ✅ For query params

const MentorMatch = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [chats, setChats] = useState<ChatType[]>([]);
	const chatsWithUnreadMessages = chats.filter((c) =>
		c.messages?.some((m) => !m.read && m.sender !== user?._id)
	);

	const tabs = [
		{ name: "Top Matches" },
		{ name: "Explore" },
		{ name: "Pending Requests", count: user?.mentorshipRequests?.length },
		{ name: "Chat", count: chatsWithUnreadMessages.length },
	];

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const tabParam = searchParams.get("tab");
	const [activeTab, setActiveTab] = useState(tabParam || "Top Matches");

	// ✅ Sync tab with URL param on first load or manual URL change
	useEffect(() => {
		if (tabParam && tabs.some((t) => t.name === tabParam)) {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	// ✅ Update query param when activeTab changes
	useEffect(() => {
		const current = new URLSearchParams(searchParams);
		current.set("tab", activeTab);
		setSearchParams(current, { replace: true });
	}, [activeTab]);

	// ✅ Load user + chats
	useEffect(() => {
		if (!user?._id) return;
		userService.getChats(user._id).then((chats) => setChats(chats));
		userService
			.getUserByID(user._id)
			.then((user) => dispatch(setUser(user)));
	}, []);

	return (
		<div className="h-full w-full flex flex-col bg-gradient-to-br from-indigo-50 to-white text-gray-900">
			{/* Header */}
			<header className="w-full py-2 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
				{/* Tabs */}
				<div className="flex justify-center">
					<div className="flex bg-gray-100 rounded-full p-1">
						{tabs.map(({ name, count }) => (
							<button
								key={name}
								onClick={() => setActiveTab(name)}
								className={`relative flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
									activeTab === name
										? "bg-white shadow text-indigo-700"
										: "text-gray-500 hover:text-gray-700"
								}`}
							>
								<span>{name}</span>

								{!!count && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 15,
										}}
										className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 shadow"
									>
										{count}
									</motion.span>
								)}
							</button>
						))}
					</div>
				</div>
			</header>

			{/* Animated Tab Content */}
			<main className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.25 }}
						className="w-full h-full"
					>
						<MentorMatchContext value={{ chats, setChats }}>
							{activeTab === "Top Matches" && <TopMatches />}
							{activeTab === "Explore" && <Explore />}
							{activeTab === "Pending Requests" && (
								<PendingInvites />
							)}
							{activeTab === "Chat" && <Chat />}
						</MentorMatchContext>
					</motion.div>
				</AnimatePresence>
			</main>
		</div>
	);
};

export default MentorMatch;
