import { useState, useEffect, useRef, KeyboardEvent } from "react";

interface QuizModalContentProps {
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

const QuizModalContent = ({
	sendMessage,
	setOpenMenuModal,
}: QuizModalContentProps) => {
	const [title, setTitle] = useState("");
	const [options, setOptions] = useState<string[]>([""]);
	const [correctMCQAnswers, setCorrectMCQAnswers] = useState<number[]>([]);
	const [questionType, setQuestionType] = useState<"multiple" | "free">(
		"multiple"
	);
	const [correctFreeTextAnswer, setCorrectFreeTextAnswer] = useState("");
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	useEffect(() => {
		setTitle("");
		setOptions([""]);
		setCorrectMCQAnswers([]);
		setQuestionType("multiple");
		setCorrectFreeTextAnswer("");
		inputRefs.current = [];
	}, []);

	const handleOptionChange = (index: number, value: string) => {
		const updated = [...options];
		updated[index] = value;
		setOptions(updated);
	};

	const handleKeyPress = (
		index: number,
		e: KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter" && options[index].trim() !== "") {
			e.preventDefault();
			setOptions((prev) => [...prev, ""]);
			setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
		}
		if (
			e.key === "Backspace" &&
			options[index] === "" &&
			options.length > 1
		) {
			e.preventDefault();
			setOptions((prev) => prev.filter((_, i) => i !== index));
			setCorrectMCQAnswers((prev) => prev.filter((i) => i !== index));
		}
	};

	const toggleCorrectAnswer = (index: number) => {
		setCorrectMCQAnswers((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		);
	};

	const canSend =
		title.trim() !== "" &&
		(questionType === "free"
			? correctFreeTextAnswer.trim() !== ""
			: options.some((o) => o.trim() !== "") &&
			  correctMCQAnswers.length > 0);

	return (
		<div className="flex flex-col gap-4">
			{/* Quiz Title */}
			<input
				type="text"
				placeholder="Quiz Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
			/>

			{/* Question Type Selector */}
			<div className="flex gap-3 text-sm items-center">
				<label className="flex items-center gap-2">
					<input
						type="radio"
						checked={questionType === "multiple"}
						onChange={() => setQuestionType("multiple")}
						className="accent-indigo-600"
					/>
					Multiple Choice
				</label>
				<label className="flex items-center gap-2">
					<input
						type="radio"
						checked={questionType === "free"}
						onChange={() => setQuestionType("free")}
						className="accent-indigo-600"
					/>
					Free Text
				</label>
			</div>

			{/* Multiple Choice Options */}
			{questionType === "multiple" && (
				<div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
					{options.map((option, index) => (
						<div
							key={index}
							className="flex items-center justify-between gap-4 p-1"
						>
							<input
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								placeholder={`Option ${index + 1}`}
								value={option}
								onChange={(e) =>
									handleOptionChange(index, e.target.value)
								}
								onKeyDown={(e) => handleKeyPress(index, e)}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
							/>
							<label className="flex items-center gap-2">
								<div className="relative flex items-center">
									<input
										type="checkbox"
										checked={correctMCQAnswers.includes(
											index
										)}
										onChange={() =>
											toggleCorrectAnswer(index)
										}
										className={`
																	appearance-none 
																	w-6 h-6 
																	rounded-full 
																	border border-gray-300 
																	cursor-pointer 
																	transition-all duration-300
																	${
																		correctMCQAnswers.includes(
																			index
																		)
																			? "bg-gradient-to-br from-purple-500 to-indigo-500 border-none"
																			: "bg-gray-200 hover:bg-gray-300"
																	}
																`}
									/>
									{correctMCQAnswers.includes(index) && (
										<svg
											className="absolute inset-0 m-auto w-5 h-5 text-white pointer-events-none"
											fill="none"
											stroke="currentColor"
											strokeWidth={3}
											viewBox="-3 -2 28 28"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</div>
								<span className="text-sm">Correct</span>
							</label>
						</div>
					))}
				</div>
			)}

			{/* Free Text Correct Answer */}
			{questionType === "free" && (
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="Correct Answer"
						value={correctFreeTextAnswer}
						onChange={(e) =>
							setCorrectFreeTextAnswer(e.target.value)
						}
						className="px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
					/>
				</div>
			)}

			{/* Send Quiz Button */}
			<button
				onClick={() => {
					sendMessage(title, "quiz", {
						type: questionType,
						options: questionType === "multiple" ? options : [],
						correctAnswers:
							questionType === "multiple"
								? correctMCQAnswers
								: [correctFreeTextAnswer],
						results: {
							correct: 0,
							wrong: 0,
						},
					});
					setOpenMenuModal(null);
				}}
				disabled={!canSend}
				className={`w-full py-2 rounded-lg font-semibold transition ${
					!canSend
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-indigo-600 text-white hover:bg-indigo-700"
				}`}
			>
				Send Quiz
			</button>
		</div>
	);
};

export default QuizModalContent;
