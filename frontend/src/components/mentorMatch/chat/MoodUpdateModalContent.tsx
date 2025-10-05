import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { Dispatch } from "redux";

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
const MoodUpdateModalContent = ({ sendMessage, setOpenMenuModal }: Prop) => {
	const emojis = [
		{
			icon: "😄",
			mood: "Feeling Great!",
		},
		{
			icon: "🙂",
			mood: "Feeling Good",
		},
		{
			icon: "😐",
			mood: "Neutral",
		},
		{
			icon: "😔",
			mood: "Sad",
		},
		{
			icon: "😡",
			mood: "Angry",
		},
		{
			icon: "😴",
			mood: "Feeling Sleepy",
		},
		{
			icon: "🤩",
			mood: "Excited",
		},
		{
			icon: "😱",
			mood: "Surprised",
		},
	];
	const [note, setNote] = useState("");
	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-md text-center font-semibold text-gray-700">
				Select the emoji that best describes today's mood
			</h3>
			<div className="grid grid-cols-4 gap-4">
				{emojis.map((emoji) => (
					<motion.button
						key={emoji.mood}
						onClick={async () => {
							await sendMessage(note, "moodUpdate", {
								icon: emoji.icon,
								mood: emoji.mood,
							});
							setNote("");
							setOpenMenuModal(null);
						}}
						whileHover={{ scale: 1.3 }}
						whileTap={{ scale: 1.1 }}
						className="text-5xl p-5 rounded-lg hover:bg-indigo-50 transition"
					>
						{emoji.icon}
					</motion.button>
				))}
			</div>

			<textarea
				className="border border-gray-300 rounded-lg p-3 w-full resize-none placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-4"
				placeholder="Write something about your day (optional)"
				value={note}
				onChange={(e) => setNote(e.target.value)}
				rows={3}
			/>
		</div>
	);
};

export default MoodUpdateModalContent;
