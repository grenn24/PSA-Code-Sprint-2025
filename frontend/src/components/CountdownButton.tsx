import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowUp } from "react-icons/io5";

interface Prop {
	onClick?: () => void;
	onCountdownComplete: () => void;
	count: number | null;
	setCount: React.Dispatch<React.SetStateAction<number | null>>;
}

const CountdownButton = ({
	onCountdownComplete,
	count,
	setCount,
	onClick,
}: Prop) => {
	const [pulseKey, setPulseKey] = useState(0);
	const intervalRef = useRef<number | null>(null);

	// Start countdown whenever `count` changes from null → a number
	useEffect(() => {
		// Only start if count is a number and no existing countdown is running
		if (count === null || intervalRef.current !== null) return;

		setPulseKey(0);
		let current = count;

		intervalRef.current = setInterval(() => {
			current -= 1;
			if (current <= 0) {
				clearInterval(intervalRef.current!);
				intervalRef.current = null;
				setCount(null);
				onCountdownComplete();
			} else {
				setCount(current);
				setPulseKey((k) => k + 1);
			}
		}, 1000);

		// Cleanup when count resets or component unmounts
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [count]);

	return (
		<motion.button
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			onClick={() => {
				if (count === null) {
					onClick?.();
				}
			}}
			className="relative p-2 bg-blue-500 hover:bg-blue-600 rounded-full shadow-md"
		>
			<div className="h-[18px] w-[18px] flex items-center justify-center text-white font-semibold">
				{count !== null ? count : <IoArrowUp size={18} />}
			</div>

			{/* Smooth outline pulse */}
			<AnimatePresence>
				{count !== null && (
					<motion.span
						key={pulseKey}
						className="absolute inset-0 rounded-full border-3 border-blue-300 pointer-events-none"
						initial={{ scale: 1, opacity: 1 }}
						animate={{ scale: 2.0, opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.9, ease: "easeOut" }}
					/>
				)}
			</AnimatePresence>
		</motion.button>
	);
};

export default CountdownButton;
