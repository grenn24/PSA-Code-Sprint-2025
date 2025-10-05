import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BubbleWrapper } from "./MessageBubble";

interface FeedbackEntry {
	_id?: string;
	message: string;
	rating: number | null;
}

interface Props {
	message: any;
	isSender: boolean;
	updateMessage: (
		messageID: string,
		data: {
			content: string;
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
				| "wellbeingPrompt";
			metadata?: Record<string, any>;
		}
	) => Promise<void>;
}

const FeedbackRequestBubbleContent: React.FC<Props> = ({
	message,
	isSender,
	updateMessage,
}) => {
	const originalFeedbacks: FeedbackEntry[] =
		message.metadata?.feedbacks || [];

	const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>(
		isSender || originalFeedbacks.length > 0
			? originalFeedbacks
			: [...originalFeedbacks, { message: "", rating: null }]
	);

	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	const handleFeedbackChange = async (
		index: number,
		field: "message" | "rating",
		value: string | number
	) => {
		const updatedFeedbacks = [...feedbacks];
		updatedFeedbacks[index] = {
			...updatedFeedbacks[index],
			[field]: value,
		};
		setFeedbacks(updatedFeedbacks);

		await updateMessage(message._id, {
			content: message.content || "",
			type: "feedbackRequest",
			metadata: { ...message.metadata, feedbacks: updatedFeedbacks },
		});
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		const currentFeedback = feedbacks[index];

		if (e.key === "Enter") {
			e.preventDefault();
			if (currentFeedback.message.trim() !== "") {
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

		if (
			e.key === "Backspace" &&
			currentFeedback.message === "" &&
			feedbacks.length > 1
		) {
			e.preventDefault();
			const newFeedbacks = feedbacks.filter((_, i) => i !== index);
			setFeedbacks(newFeedbacks);

			setTimeout(() => {
				if (index > 0) inputRefs.current[index - 1]?.focus();
			}, 0);
		}
	};

	useEffect(() => {
		if (!isSender) {
			return;
		}
		setFeedbacks(message.metadata?.feedbacks || []);
	}, [message.metadata?.feedbacks]);
	return (
		<BubbleWrapper isSender={isSender} message={message}>
			<div className="flex flex-col gap-2">
				<span className="font-bold text-lg">Feedback Request</span>

				{message.content && (
					<p className="text-md">{message.content}</p>
				)}

				<div className="flex flex-col gap-2 mt-2">
					{feedbacks.map((fb, index) => (
						<div
							key={index}
							className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 bg-gray-50 rounded-xl transition"
						>
							{isSender ? (
								<p className="text-gray-800 flex-1">
									{fb.message}
								</p>
							) : (
								<input
									ref={(el) => {
										inputRefs.current[index] = el;
									}}
									type="text"
									value={fb.message}
									onChange={(e) =>
										handleFeedbackChange(
											index,
											"message",
											e.target.value
										)
									}
									onKeyDown={(e) => handleKeyDown(e, index)}
									placeholder="Enter your feedback"
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
								/>
							)}

							<div className="flex gap-1 mt-1 sm:mt-0">
								{[1, 2, 3, 4, 5].map((num) =>
									isSender ? (
										<span
											key={num}
											className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
												fb.rating && fb.rating >= num
													? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow"
													: "bg-gray-200 text-gray-600"
											}`}
										>
											{num}
										</span>
									) : (
										<motion.button
											key={num}
											onClick={() =>
												handleFeedbackChange(
													index,
													"rating",
													num
												)
											}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
											className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
												fb.rating === num
													? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
													: "bg-gray-200 text-gray-600 hover:bg-blue-100"
											}`}
										>
											{num}
										</motion.button>
									)
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</BubbleWrapper>
	);
};

export default FeedbackRequestBubbleContent;
