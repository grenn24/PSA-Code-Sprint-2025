import { User } from "@common/types/user";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useAppSelector } from "redux/store";
import FeedbackModalContent from "./FeedbackModalContent";
import MoodUpdateModalContent from "./MoodUpdateModalContent";
import FeedbackRequestModalContent from "./FeedbackRequestModalContent";
import ShareFileModalContent from "./ShareFileModalContent";
import PollModalContent from "./PollModalContent";
import QuizModalContent from "./QuizModalContent";
import TipModalContent from "./TipModalContent";

interface Prop {
	recipient: User;
	sendMessage: (
		content: string,
		type?:
			| "text"
			| "file"
			| "tip"
			| "quiz"
			| "poll"
			| "feedback"
			| "feedbackRequest"
			| "question"
			| "moodUpdate"
			| "wellbeingPrompt",
		metadata?: Record<string, any>
	) => Promise<void>;
}

export const ChatMenuButton = ({ recipient, sendMessage }: Prop) => {
	const { user } = useAppSelector((state) => state.user);
	const [openChatMenu, setOpenChatMenu] = useState(false);
	const [openMenuModal, setOpenMenuModal] = useState<string | null>(null);
	const chatMenuRef = useRef<HTMLDivElement>(null);
	const isMentor = user?.mentees.some(
		(mentee) => mentee._id === recipient._id
	);

	const openModal = (type: string) => {
		setOpenMenuModal(type);
		setOpenChatMenu(false);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setOpenChatMenu((prev) => !prev)}
				className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition"
			>
				<PlusIcon className="w-5 h-5" />
			</button>

			{/* Chat Menu */}
			<AnimatePresence>
				{openChatMenu && (
					<motion.div
						ref={chatMenuRef}
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						className="absolute bottom-12 w-60 bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-xl p-2 flex flex-col z-50"
					>
						{isMentor ? (
							<>
								<MenuItem
									label="📁 Share file"
									onClick={() => openModal("Share File")}
								/>
								<MenuItem
									label="💡 Share a quick tip"
									onClick={() => openModal("Tip")}
								/>
								<MenuItem
									label="🧠 Start a quiz"
									onClick={() => openModal("Quiz")}
								/>
								<MenuItem
									label="📊 Start a poll"
									onClick={() => openModal("Poll")}
								/>
								<MenuItem
									label="📝 Give feedback"
									onClick={() => openModal("Feedback")}
								/>
								<MenuItem
									label="💬 Wellbeing checks"
									onClick={() => openModal("wellbeingPrompt")}
								/>
							</>
						) : (
							<>
								<MenuItem
									label="📁 Share file"
									onClick={() => openModal("Share File")}
								/>
								<MenuItem
									label="📨 Request feedback"
									onClick={() =>
										openModal("Request for Feedback")
									}
								/>
								<MenuItem
									label="📝 Give feedback"
									onClick={() => openModal("Feedback")}
								/>
								<MenuItem
									label="🙂 Mood / status update"
									onClick={() => openModal("Mood Update")}
								/>
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Modal */}
			{openMenuModal && (
				<ChatMenuModal
					type={openMenuModal}
					sendMessage={sendMessage}
					closeModal={() => setOpenMenuModal(null)}
				/>
			)}
		</div>
	);
};

const MenuItem = ({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className="text-left text-md text-gray-800 hover:bg-indigo-50 rounded-lg px-3 py-2 transition whitespace-pre-wrap"
	>
		{label}
	</button>
);

interface ModalProps {
	type: string | null;
	sendMessage: (
		content: string,
		type?:
			| "text"
			| "file"
			| "tip"
			| "quiz"
			| "poll"
			| "feedback"
			| "feedbackRequest"
			| "question"
			| "moodUpdate"
			| "wellbeingPrompt",
		metadata?: Record<string, any>
	) => Promise<void>;
	closeModal: () => void;
}

export const ChatMenuModal = ({
	type,
	sendMessage,
	closeModal,
}: ModalProps) => {
	const renderContent = () => {
		switch (type) {
			case "Tip":
			return <TipModalContent sendMessage={sendMessage} setOpenMenuModal={closeModal} />
			case "Quiz":
				return (
					<QuizModalContent
						sendMessage={sendMessage}
						setOpenMenuModal={closeModal}
					/>
				);
			case "Poll":
				return (
					<PollModalContent
						sendMessage={sendMessage}
						setOpenMenuModal={closeModal}
					/>
				);
			case "Request for Feedback":
				return (
					<FeedbackRequestModalContent
						sendMessage={sendMessage}
						setOpenMenuModal={closeModal}
					/>
				);
			case "Feedback":
				return (
					<FeedbackModalContent
						sendMessage={sendMessage}
						setOpenMenuModal={closeModal}
					/>
				);
			case "Mood Update":
				return (
					<MoodUpdateModalContent
						sendMessage={sendMessage}
						setOpenMenuModal={closeModal}
					/>
				);
			case "Share File":
				return (
					<ShareFileModalContent
						sendMessage={sendMessage}
						setOpenMenuModal={closeModal}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<AnimatePresence>
			{type && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
				>
					<motion.div
						initial={{ scale: 0.95, y: 20 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.95, y: 20 }}
						className="bg-white rounded-xl shadow-lg p-4 w-xl max-w-full flex flex-col gap-4"
					>
						<div className="flex justify-between items-center">
							<h2 className="font-semibold text-xl">{type}</h2>
							<button onClick={closeModal}>
								<XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
							</button>
						</div>
						{renderContent()}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
