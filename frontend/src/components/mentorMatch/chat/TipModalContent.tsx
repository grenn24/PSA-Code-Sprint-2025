import React, { useState } from "react";

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

const TipModalContent = ({ sendMessage, setOpenMenuModal }: Prop) => {
	const [tipContent, setTipContent] = useState("");

	const canSend = tipContent.trim() !== "";

	const handleSend = async () => {
		if (!canSend) return;

		await sendMessage(tipContent, "tip", {
			timestamp: new Date().toISOString(),
		});
		setTipContent("");
		setOpenMenuModal(null);
	};

	return (
		<>
			{/* Tip Content Input */}
			<textarea
				value={tipContent}
				onChange={(e) => setTipContent(e.target.value)}
				placeholder="Write your tip here..."
				rows={5}
				className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
			/>

			{/* Send Button */}
			<button
				disabled={!canSend}
				onClick={handleSend}
				className={`w-full py-2 rounded-lg font-semibold transition ${
					canSend
						? "bg-indigo-600 text-white hover:bg-indigo-700"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}
			>
				Send Tip
			</button>
		</>
	);
};

export default TipModalContent;
