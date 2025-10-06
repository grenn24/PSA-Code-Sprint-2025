import React, { useState } from "react";
import { motion } from "framer-motion";

interface Prop {
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
	setOpenMenuModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const FeedbackRequestModalContent = ({
	sendMessage,
	setOpenMenuModal,
}: Prop) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const canSend = title.trim() !== "";

	return (
		<div className="flex flex-col gap-4 w-full">
			{/* Title Input */}
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
			/>

			{/* Description / Instructions */}
			<textarea
				rows={3}
				placeholder="Description (optional)"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="px-3 py-2 border border-gray-300 rounded-lg resize-none focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
			/>

			<button
				disabled={!canSend}
				onClick={() => {
					sendMessage(title, "feedbackRequest", {
						description,
					});
					setOpenMenuModal(null);
				}}
				className={`w-full py-2 rounded-lg font-semibold transition ${
					canSend
						? "bg-indigo-600 text-white hover:bg-indigo-700"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}
			>
				Send Request
			</button>
		</div>
	);
};

export default FeedbackRequestModalContent;
