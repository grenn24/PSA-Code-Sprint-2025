import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface FeedbackEntry {
	message: string;
	rating: number | null;
}

interface FeedbackModalContentProps {
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

const FeedbackModalContent = ({
	sendMessage,
	setOpenMenuModal,
}: FeedbackModalContentProps) => {
	const [title, setTitle] = useState("");
	const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([
		{ message: "", rating: null },
	]);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	// Reset feedbacks when modal opens
	useEffect(() => {
		setTitle("");
		setFeedbacks([{ message: "", rating: null }]);
		inputRefs.current = [];
	}, []);

	const handleMessageChange = (index: number, value: string) => {
		const updated = [...feedbacks];
		updated[index].message = value;
		setFeedbacks(updated);
	};

	const handleRatingChange = (index: number, rating: number) => {
		const updated = [...feedbacks];
		updated[index].rating = rating;
		setFeedbacks(updated);
	};

	const handleKeyPress = (
		index: number,
		e: KeyboardEvent<HTMLInputElement>
	) => {
		// 🔹 Press Enter → add new feedback
		if (e.key === "Enter") {
			e.preventDefault();
			if (feedbacks[index].message.trim() !== "") {
				const newFeedbacks = [
					...feedbacks,
					{ message: "", rating: null },
				];
				setFeedbacks(newFeedbacks);

				setTimeout(() => {
					inputRefs.current[index + 1]?.focus();
				}, 0);
			}
		}

		// 🔹 Press Backspace on empty feedback → remove it (if not last)
		if (
			e.key === "Backspace" &&
			feedbacks[index].message === "" &&
			feedbacks.length > 1
		) {
			e.preventDefault();
			setFeedbacks((prev) => {
				const updated = [...prev];
				updated.splice(index, 1); // remove current feedback
				return updated;
			});

			setTimeout(() => {
				// 🔹 Focus previous input if available
				if (index > 0) {
					inputRefs.current[index - 1]?.focus();
				} else {
					inputRefs.current[0]?.focus();
				}
			}, 0);
		}
	};

	const canSend =
		title.trim() !== "" &&
		feedbacks.length > 0 &&
		feedbacks.every((fb) => fb.message && fb.rating !== null);

	return (
		<div className="flex flex-col gap-4">
			{/* Title Input */}
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
			/>

			{/* Feedback Entries */}
			<div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
				{feedbacks.map((fb, index) => (
					<div
						key={index}
						className="flex flex-col gap-2 p-3 rounded-xl bg-gray-100"
					>
						<input
							ref={(el) => {
								inputRefs.current[index] = el;
							}}
							type="text"
							placeholder="Feedback"
							value={fb.message}
							onChange={(e) =>
								handleMessageChange(index, e.target.value)
							}
							onKeyDown={(e) => handleKeyPress(index, e)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
						/>

						<div className="flex gap-2 mt-1 justify-around">
							{[1, 2, 3, 4, 5].map((rating) => (
								<motion.button
									key={rating}
									onClick={() =>
										handleRatingChange(index, rating)
									}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className={`px-3 py-1 rounded-full font-semibold transition-colors ${
										fb.rating === rating
											? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
											: "bg-gray-200 text-gray-800"
									}`}
								>
									{rating}
								</motion.button>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Send Button */}
			<button
				onClick={() => {
					sendMessage(title, "feedback", { feedbacks });
					setOpenMenuModal(null);
				}}
				disabled={!canSend}
				className={`w-full py-2 rounded-lg font-semibold transition ${
					!canSend
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-indigo-600 text-white hover:bg-indigo-700"
				}`}
			>
				Send Feedback
			</button>
		</div>
	);
};

export default FeedbackModalContent;
