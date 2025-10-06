import { Message } from "@common/types/chat";
import React, { useState } from "react";
import { BubbleWrapper } from "./MessageBubble";
import confetti from "canvas-confetti";

interface Prop {
	message: Message;
	isSender: boolean;
}

const QuizMessageBubbleContent = ({ message, isSender }: Prop) => {
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
		console.log(correctAnswers);
		if (type === "multiple") {
			return correctAnswers?.includes?.(answer);
		} else {
			return correctAnswers?.[0] === userAnswer?.[0];
		}
	};

	const canSubmit =
		message.metadata.type === "multiple"
			? (userAnswer as number[]).length > 0
			: (userAnswer[0] as string).trim() !== "";

	const restartQuiz = () => {
		setUserAnswer(message.metadata.type === "multiple" ? [] : [""]);
		setSubmitted(false);
	};

	const handleAnswer = () => {
		setSubmitted(true);
		const isCorrect = isAnswerCorrect(
			userAnswer?.[0],
			message.metadata.type
		);
		if (isCorrect) {
			for (let i = 0; i < 3; i++) {
				setTimeout(() => {
					confetti({
						spread: 390,
						ticks: 70,
						gravity: 0.2,
						decay: 0.92,
						startVelocity: 25,
						particleCount: 50,
						scalar: 1.2,
					});
				}, i * 100);
			}
		}
	};

	return (
		<BubbleWrapper isSender={isSender} message={message}>
			<div className="flex flex-col gap-3 min-w-xs w-full relative">
				{/* Quiz Title */}
				<div className="font-bold text-lg text-gray-800">
					{message.content}
				</div>

				{/* Multiple Choice */}
				{message.metadata.type === "multiple" &&
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
								} else if (selected) {
									bgClass = "bg-indigo-200";
								}

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
													✓
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
				{message.metadata.type === "free" && (
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

						{(isSender || submitted) && (
							<div
								className={`p-3 rounded-xl ${
									isAnswerCorrect(userAnswer?.[0], "freeText")
										? "bg-green-500 text-white"
										: "bg-red-500 text-white"
								}`}
							>
								{isAnswerCorrect(userAnswer?.[0], "freeText")
									? "Correct ✅"
									: `Wrong ❌ — Correct: ${message.metadata.correctAnswers[0]}`}
							</div>
						)}
					</div>
				)}

				{/* Answer Button */}
				{!isSender && !submitted && (
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

				{/* Restart Button */}
				{!isSender && submitted && (
					<button
						onClick={restartQuiz}
						className="w-full py-2 rounded-lg font-semibold bg-yellow-400 text-white hover:bg-yellow-500 transition"
					>
						Restart
					</button>
				)}
			</div>
		</BubbleWrapper>
	);
};

export default QuizMessageBubbleContent;
