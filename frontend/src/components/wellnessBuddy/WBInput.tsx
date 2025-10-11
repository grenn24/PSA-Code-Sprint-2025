import { AnimatePresence } from "framer-motion";
import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import CountdownButton from "components/CountdownButton";

interface Prop {
	onSubmit: (input: string) => void;
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	countdownCounter: number | null;
	setCountdownCounter: React.Dispatch<React.SetStateAction<number | null>>;
	onCountdownComplete: () => void;
}
const WBInput = ({
	onSubmit,
	input,
	setInput,
	countdownCounter,
	setCountdownCounter,
	onCountdownComplete,
}: Prop) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useLayoutEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.height = "0px";
			inputRef.current.style.height =
				inputRef.current.scrollHeight + "px";
		}
	}, [input]);

	return (
		<motion.div
			initial={{ y: 80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="absolute bottom-16 md:bottom-8 w-full px-8 flex justify-center"
		>
			<div className="relative flex items-end border border-gray-200 bg-white/50 backdrop-blur-md shadow-lg rounded-3xl px-4 py-2 min-h-14 h-full w-full max-w-280 gap-2">
				<textarea
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (countdownCounter !== null) {
							setCountdownCounter(null);
						}
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							onSubmit(input);
						}
					}}
					placeholder="Type your thoughts"
					className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none resize-none h-full my-auto"
				/>
				<AnimatePresence>
					{(input.trim() || countdownCounter !== null) && (
						<CountdownButton
							count={countdownCounter}
							setCount={setCountdownCounter}
							onCountdownComplete={() => {
								onCountdownComplete();
							}}
							onClick={() => {
								onSubmit(input);
							}}
						/>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default WBInput;
