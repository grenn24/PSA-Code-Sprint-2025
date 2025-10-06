import { User } from "@common/types/user";
import { useState, useEffect, useRef, KeyboardEvent } from "react";

interface PollModalContentProps {
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

const PollModalContent = ({
	sendMessage,
	setOpenMenuModal,
}: PollModalContentProps) => {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState<{ label: string; voters: User[] }[]>(
		[{ label: "", voters: [] }]
	);
	const [allowMultiple, setAllowMultiple] = useState(false);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	// Reset when modal opens
	useEffect(() => {
		setQuestion("");
		setOptions([{ label: "", voters: [] }]);
		setAllowMultiple(false);
		inputRefs.current = [];
	}, []);

	const handleOptionChange = (index: number, value: string) => {
		const updated = [...options];
		updated[index] = { label: value, voters: [] };
		setOptions(updated);
	};

	const handleKeyPress = (
		index: number,
		e: KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (options[index].label.trim() !== "") {
				const newOptions = [...options, { label: "", voters: [] }];
				setOptions(newOptions);

				setTimeout(() => {
					inputRefs.current[index + 1]?.focus();
				}, 0);
			}
		}

		if (
			e.key === "Backspace" &&
			options[index].label === "" &&
			options.length > 1
		) {
			e.preventDefault();
			setOptions((prev) => {
				const updated = [...prev];
				updated.splice(index, 1);
				return updated;
			});

			setTimeout(() => {
				if (index > 0) {
					inputRefs.current[index - 1]?.focus();
				} else {
					inputRefs.current[0]?.focus();
				}
			}, 0);
		}
	};

	const canSend =
		question.trim() !== "" &&
		options.some((opt) => opt.label.trim() !== "");

	return (
		<div className="flex flex-col gap-4">
			<input
				type="text"
				placeholder="Poll Question"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
			/>
			<div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-lg">
				<p>Poll Options</p>
				<div className="flex flex-col gap-3 max-h-96">
					{options.map((option, index) => (
						<div key={index} className="w-full">
							<input
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								placeholder={`Option ${index + 1}`}
								value={option.label}
								onChange={(e) =>
									handleOptionChange(index, e.target.value)
								}
								onKeyDown={(e) => handleKeyPress(index, e)}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none w-full"
							/>
						</div>
					))}
				</div>
			</div>

			<label className="flex items-center gap-2 text-gray-700">
				<input
					type="checkbox"
					checked={allowMultiple}
					onChange={(e) => setAllowMultiple(e.target.checked)}
					className="w-4 h-4 accent-indigo-600"
				/>
				<span>Allow multiple choices</span>
			</label>

			<button
				onClick={() => {
					const filteredOptions = options.filter(
						(opt) => opt.label.trim() !== ""
					);
					sendMessage(question, "poll", {
						options: filteredOptions,
						allowMultiple,
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
				Send Poll
			</button>
		</div>
	);
};

export default PollModalContent;
