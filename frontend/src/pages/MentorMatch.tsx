import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopMatches from "../components/mentorMatch/TopMatches";
import Explore from "../components/mentorMatch/Explore";
import PendingInvites from "../components/mentorMatch/Invites";
import Chat from "../components/mentorMatch/Chat";
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { setUser } from "redux/slices/user";
import { useSearchParams } from "react-router-dom";
import { useMentorMatchContext } from "context/MentorMatchContext";

const MentorMatch = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const { chats } = useMentorMatchContext();
	const chatsWithUnreadMessages = chats.filter((c) =>
		c.messages?.some((m) => !m.read && m.sender !== user?._id)
	);

	const tabs = [
		{ name: "Chat", count: chatsWithUnreadMessages.length },
		{ name: "Suggested" },
		{ name: "Explore" },
		{ name: "Requests", count: user?.mentorshipRequests?.length },
	];

	const [searchParams, setSearchParams] = useSearchParams();
	const tabParam = searchParams.get("tab");
	const [activeTab, setActiveTab] = useState(tabParam || "Chat");

	useEffect(() => {
		if (tabParam && tabs.some((t) => t.name === tabParam)) {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	useEffect(() => {
		const current = new URLSearchParams(searchParams);
		current.set("tab", activeTab);
		setSearchParams(current, { replace: true });
	}, [activeTab]);

	useEffect(() => {
		if (!user?._id) return;
		userService
			.getUserByID(user._id)
			.then((user) => dispatch(setUser(user)));
	}, []);

	return (
		<div className="h-full w-full flex flex-col bg-gradient-to-br from-indigo-50 to-white text-gray-900">
			<header className="w-full py-2 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
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

			<main className="flex-1 p-2 md:p4 overflow-y-auto mb-14 md:mb-0">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.25 }}
						className="w-full h-full"
					>
						{activeTab === "Suggested" && <TopMatches />}
						{activeTab === "Explore" && <Explore />}
						{activeTab === "Requests" && <PendingInvites />}
						{activeTab === "Chat" && <Chat />}
					</motion.div>
				</AnimatePresence>
			</main>
		</div>
	);
};

export default MentorMatch;
