import { User } from "@common/types/user";
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/store";

interface Prop {
	recipient: User;
}
export const ChatMenuButton = ({ recipient }: Prop) => {
    
	const { user } = useAppSelector((state) => state.user);
	const [openChatMenu, setOpenChatMenu] = useState(false);
	const chatMenuRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
        
                if (
                    chatMenuRef.current &&
                    !chatMenuRef.current.contains(event.target as Node)
                ) {
                    setOpenChatMenu(false);
                }
            }
            if ( openChatMenu)
                document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }, [ openChatMenu]);
	return (
		<div className="relative">
			<button
				onClick={() => setOpenChatMenu((prev) => !prev)}
				className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition"
			>
				<PlusIcon className="w-5 h-5" />
			</button>

			<AnimatePresence>
				{openChatMenu && (
					<motion.div
						ref={chatMenuRef}
						initial={{
							opacity: 0,
							y: 10,
							scale: 0.95,
						}}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
						}}
						exit={{
							opacity: 0,
							y: 10,
							scale: 0.95,
						}}
						className="absolute bottom-12 right-0 w-56 bg-white/60 backdrop-blur-md shadow-xl border border-gray-200 rounded-xl p-2 flex flex-col z-50"
					>
						{user?.mentees.find(
							(mentee) => mentee._id === recipient._id
						) ? (
							// 💼 Mentor menu
							<>
								<MenuItem label="📁 Share file" />
								<MenuItem label="💡 Share a quick tip" />
								<MenuItem label="🧠 Start a quiz" />
								<MenuItem label="📊 Start a poll" />
								<MenuItem label="📝 Give feedback" />
								<MenuItem label="💬 Wellbeing checks" />
							</>
						) : (
							// 🎓 Mentee menu
							<>
								<MenuItem label="📁 Share file" />
								<MenuItem label="❓ Ask a question" />
								<MenuItem label="📨 Request feedback" />
								<MenuItem label="📝 Give feedback" />
								<MenuItem label="🙂 Mood / status update" />
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const MenuItem = ({ label }: { label: string }) => (
	<button className="text-left text-sm text-gray-700 hover:bg-indigo-50 rounded-lg px-3 py-2 transition">
		{label}
	</button>
);
