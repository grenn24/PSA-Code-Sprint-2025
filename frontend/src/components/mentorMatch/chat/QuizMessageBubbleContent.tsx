import { Message } from "@common/types/chat";
import React, { useState } from "react";
import { BubbleWrapper } from "./MessageBubble";
import confetti from "canvas-confetti";

interface Prop {
	message: Message;
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

const QuizMessageBubbleContent = ({
	message,
	isSender,
	updateMessage,
}: Prop) => {
	const [userAnswer, setUserAnswer] = useState<number[] | string[]>(
		message.metadata.type === "multiple" ? [] : [""]
	);
	const [submitted, setSubmitted] = useState(false);

	const handleOptionClick = (index: number) => {
		if (isSender || submitted) return;
		if (message.metadata.allowMultiple) {
			const newAnswer = userAnswer as number[];
			setUserAnswer(
				newAnswer.includes(index)
					? newAnswer.filter((i) => i !== index)
					: [...newAnswer, index]
			);
		} else {
			setUserAnswer([index]);
		}
	};

	const handleFreeTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isSender || submitted) return;
		setUserAnswer([e.target.value]);
	};

	const isAnswerCorrect = (
		answer: string | number,
		type: "multiple" | "freeText"
	) => {
		const correctAnswers = message.metadata.correctAnswers;
		if (type === "multiple") return correctAnswers?.includes?.(answer);
		else
			return (
				correctAnswers?.[0]?.trim() ===
				(userAnswer?.[0] as string)?.trim()
			);
	};

	const canSubmit =
		message.metadata.type === "multiple"
			? (userAnswer as number[]).length > 0
			: (userAnswer[0] as string).trim() !== "";

	const restartQuiz = () => {
		setUserAnswer(message.metadata.type === "multiple" ? [] : [""]);
		setSubmitted(false);
	};

	const handleAnswer = async () => {
		if (!message._id) return;
		setSubmitted(true);

		let correct: boolean;
		if (message.metadata.type === "multiple") {
			correct = (userAnswer as number[]).every((i) =>
				isAnswerCorrect(i, "multiple")
			);
		} else {
			correct = isAnswerCorrect(userAnswer[0], "freeText");
		}

		// Confetti on correct answer
		if (correct) {
			for (let i = 0; i < 5; i++) {
				setTimeout(() => {
					confetti({
						spread: 450,
						ticks: 80,
						gravity: 0.2,
						decay: 0.92,
						startVelocity: 20,
						particleCount: 60,
						scalar: 1.3,
					});
				}, i * 100);
			}
		}

		// Update message metadata with correct/wrong counts
		const prevCorrect = message.metadata.results?.correct ?? 0;
		const prevWrong = message.metadata.results?.wrong ?? 0;

		await updateMessage(message._id, {
			content: message.content,
			type: "quiz",
			metadata: {
				...message.metadata,
				results: {
					correct: correct ? prevCorrect + 1 : prevCorrect,
					wrong: !correct ? prevWrong + 1 : prevWrong,
				},
			},
		});
	};

	return (
		<BubbleWrapper isSender={isSender} message={message}>
			<div className="flex flex-col gap-4 min-w-xs w-full relative">
				{/* Quiz Title */}
				<div className="font-bold text-lg text-gray-800">
					{message.content}
				</div>

				{/* Multiple Choice */}
				{message.metadata.type === "multiple" &&
					!isSender &&
					message.metadata.options && (
						<div className="flex flex-col gap-2">
							{message.metadata.options.map((opt, i) => {
								const selected = (
									userAnswer as number[]
								).includes(i);
								const correct = isAnswerCorrect(i, "multiple");

								let bgClass = "bg-gray-100 hover:bg-gray-200";
								if (isSender && correct)
									bgClass =
										"bg-gradient-to-r from-purple-500 to-indigo-500 text-white";
								else if (submitted) {
									if (correct)
										bgClass = "bg-green-500 text-white";
									else if (selected && !correct)
										bgClass = "bg-red-500 text-white";
									else if (selected)
										bgClass = "bg-indigo-200";
								} else if (selected) bgClass = "bg-indigo-200";

								return (
									<div
										key={i}
										className={`flex items-center justify-between gap-2 p-3 rounded-xl cursor-pointer transition ${bgClass}`}
										onClick={() => handleOptionClick(i)}
									>
										<span>{opt}</span>
										{submitted || isSender ? (
											correct ? (
												<span className="text-sm font-semibold">
													✔
												</span>
											) : selected ? (
												<span className="text-sm font-semibold">
													✕
												</span>
											) : null
										) : selected ? (
											<span className="text-sm font-semibold">
												✔
											</span>
										) : null}
									</div>
								);
							})}
						</div>
					)}

				{/* Free Text */}
				{message.metadata.type === "free" && !isSender && (
					<div className="flex flex-col gap-2">
						{!isSender && !submitted && (
							<input
								type="text"
								placeholder="Your answer"
								value={userAnswer[0] as string}
								onChange={handleFreeTextChange}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
							/>
						)}

						{submitted &&
							!isSender &&
							!isAnswerCorrect(userAnswer[0], "freeText") && (
								<div className="p-2 bg-yellow-100 text-gray-800 rounded-lg text-sm">
									Correct Answer:{" "}
									{message.metadata.correctAnswers[0]}
								</div>
							)}

						{(isSender || submitted) && (
							<div
								className={`p-3 rounded-xl font-semibold text-center ${
									isAnswerCorrect(userAnswer?.[0], "freeText")
										? "bg-green-500 text-white"
										: "bg-red-500 text-white"
								}`}
							>
								{isAnswerCorrect(userAnswer?.[0], "freeText")
									? "Correct ✅"
									: "Wrong ❌"}
							</div>
						)}
					</div>
				)}

				{/* Sender view: show correct answers & results */}
				{isSender && message.metadata.results && (
					<div className="p-4 bg-gray-700/10 rounded-xl  border-gray-200 text-sm text-gray-800">
						{/* Title */}
						<div className="font-semibold text-gray-900 text-md">
							Correct Answers:
						</div>

						{/* Correct Answers List */}
						<div className="flex flex-col gap-2">
							{message.metadata.correctAnswers.map(
								(ans: any, idx: number) => (
									<div
										key={idx}
										className="px-3 py-2 text-lg"
									>
										{message.metadata?.type === "multiple"
											? `${ans}. ${message.metadata?.options?.[idx]}`
											: ans}
									</div>
								)
							)}
						</div>

						<div>
							<div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
								<span>
									Correct: {message.metadata.results.correct}
								</span>
								<span>
									Wrong: {message.metadata.results.wrong}
								</span>
							</div>
							<div className="w-full h-4 bg-red-400 rounded-full overflow-hidden">
								<div
									className="h-4 bg-green-400"
									style={{
										width: `${
											(message.metadata.results.correct /
												Math.max(
													message.metadata.results
														.correct +
														message.metadata.results
															.wrong,
													1
												)) *
											100
										}%`,
									}}
								/>
							</div>
						</div>
					</div>
				)}

				{/* Answer / Restart Buttons */}
				{!isSender && (
					<div className="flex flex-col gap-2">
						{!submitted && (
							<button
								disabled={!canSubmit}
								onClick={handleAnswer}
								className={`w-full py-2 rounded-lg font-semibold transition ${
									!canSubmit
										? "bg-gray-300 text-gray-500 cursor-not-allowed"
										: "bg-indigo-600 text-white hover:bg-indigo-700"
								}`}
							>
								Answer
							</button>
						)}

						{submitted && (
							<button
								onClick={restartQuiz}
								className="w-full py-2 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
							>
								Restart
							</button>
						)}
					</div>
				)}
			</div>
		</BubbleWrapper>
	);
};

export default QuizMessageBubbleContent;
