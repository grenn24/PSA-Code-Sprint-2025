import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopMatches from "../components/mentorMatch/TopMatches";
import Explore from "../components/mentorMatch/Explore";
import PendingInvites from "../components/mentorMatch/Invites";
import Chat from "../components/mentorMatch/Chat";

const tabs = ["Top Matches", "Explore", "Pending Requests", "Chat"];

const MentorMatch = () => {
	const [activeTab, setActiveTab] = useState("Top Matches");

	return (
		<div className="h-full w-full flex flex-col bg-gradient-to-br from-indigo-50 to-white text-gray-900">
			{/* Header */}
			<header className="w-full py-2 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
				{/* Tabs */}
				<div className="flex justify-center">
					<div className="flex bg-gray-100 rounded-full p-1">
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
									activeTab === tab
										? "bg-white shadow text-indigo-700"
										: "text-gray-500 hover:text-gray-700"
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>
			</header>

			{/* Animated Tab Content */}
			<main className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
				<AnimatePresence mode="wait">
					{activeTab === "Top Matches" && (
						<TopMatches key="TopMatches" />
					)}
					{activeTab === "Explore" && <Explore key="Explore" />}
					{activeTab === "Pending Requests" && (
						<PendingInvites key="PendingRequests" />
					)}
					{activeTab === "Chat" && <Chat key="Chat" />}
				</AnimatePresence>
			</main>
		</div>
	);
};

export default MentorMatch;
