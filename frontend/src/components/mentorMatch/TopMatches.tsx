import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { User } from "@common/types/user";
import userService from "../../services/user";
import { useAppSelector } from "../../redux/store";
import dayjs from "dayjs";

const overlayVariants = {
	initial: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0.5 },
};

const TopMatches = () => {
	const { user } = useAppSelector((state) => state.user);
	const [index] = useState(0);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [topMatches, setTopMatches] = useState<User[]>([]);
	const [action, setAction] = useState<"accept" | "reject" | null>(null);
	const [swipeDirection, setSwipeDirection] = useState<
		"accept" | "reject" | null
	>(null);
	const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		setIsLoading(true);
		userService
			.getTopMatchedMentors(user?._id, 20, page)
			.then((users) => {
				setTopMatches(users);
			})
			.finally(() => setIsLoading(false));
	}, [page, user?._id]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-[400px] text-center gap-4">
				<motion.div
					initial={{ rotate: 0, opacity: 0.8 }}
					animate={{ rotate: 360, opacity: [0.8, 1, 0.8] }}
					transition={{
						repeat: Infinity,
						duration: 1.2,
						ease: "easeInOut",
					}}
					className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full shadow-md"
				/>
				<h3 className="text-2xl font-semibold text-indigo-700">
					Finding your perfect mentor match
				</h3>
				<p className="text-gray-500 text-md max-w-md mt-1">
					Anchoring your potential connections... ⚓
				</p>
			</div>
		);
	}

	if (topMatches.length === 0 && !isLoading)
		return (
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -15 }}
				className="flex flex-col items-center justify-center h-[400px] text-center px-4"
			>
				<p className="text-3xl mb-9 animate-bounce">
					😎 No mentors left
				</p>
				<p className="text-gray-500 text-lg mb-6">
					Looks like you've reached the end of your top matches. Take
					a break ☕ and check back later!
				</p>
				<button
					className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition"
					onClick={() => {
						setPage(page + 1);
					}}
				>
					Find New Matches
				</button>
			</motion.div>
		);

	const handleAction = async (type: "accept" | "reject", message?) => {
		setOpenMessageModal(false);
		setAction(type);

		if (type === "accept")
			await userService.sendMentorshipRequest(
				topMatches[index]._id,
				message
			);

		setTimeout(() => {
			setSwipeDirection(type);
			setTimeout(() => {
				setTopMatches((prev) => prev.filter((_m, i) => i !== index));
				setAction(null);
				setSwipeDirection(null);
				setMessage("");
			}, 400);
		}, 100);
	};

	return (
		<div className="flex flex-col">
			<h2 className="text-2xl font-semibold text-indigo-700 mb-[24px] font-inter">
				Top Matches
			</h2>
			<div className="w-full flex flex-col items-center">
				<div className="relative w-full max-w-5xl h-[600px]">
					<AnimatePresence mode="wait">
						{topMatches[index] && (
							<motion.div
								key={topMatches[index]._id}
								initial={{ x: 0, opacity: 0, scale: 0.9 }}
								animate={{ x: 0, opacity: 1, scale: 1 }}
								exit={{
									x:
										swipeDirection === "accept"
											? 300
											: swipeDirection === "reject"
											? -300
											: 0,
									opacity: 0,
									transition: {
										duration: 0.4,
										ease: "easeInOut",
									},
								}}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
								className="absolute w-full h-full bg-white rounded-3xl shadow-xl flex  overflow-hidden"
							>
								{action && (
									<motion.div
										variants={overlayVariants}
										initial="initial"
										animate="visible"
										exit="exit"
										className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 text-white text-6xl font-bold"
									>
										{action === "accept" ? (
											<PaperAirplaneIcon className="w-16 h-16 text-green-400" />
										) : (
											<XMarkIcon className="w-16 h-16 text-red-400" />
										)}
									</motion.div>
								)}

								{/* Avatar */}
								<img
									src={topMatches[index].avatar}
									className="h-full object-cover"
								/>

								{/* Info Section */}
								<div className="p-4 flex flex-col flex-1 overflow-auto">
									<h2 className="text-2xl font-semibold">
										{topMatches[index].name}
									</h2>
									<p className="text-gray-500">
										{topMatches[index].position}
									</p>

									{/* Department & Unit */}
									<div className="flex gap-4 mt-2 text-sm text-gray-600">
										{topMatches[index].department && (
											<span>
												🏢{" "}
												{topMatches[index].department}
											</span>
										)}
										{topMatches[index].unit && (
											<span>
												📌 {topMatches[index].unit}
											</span>
										)}
									</div>

									{/* Hire Date */}
									{topMatches[index].hireDate && (
										<p className="mt-1 text-sm text-gray-500">
											🗓 Joined:{" "}
											{dayjs(
												topMatches[index].hireDate
											).format("DD MMM YYYY")}
										</p>
									)}

									{/* Skills */}
									<div className="mb-3 mt-5">
										<p className="text-sm font-inter font-bold text-gray-500 mb-1">
											Skills
										</p>
										<div className="flex gap-2 flex-wrap">
											{topMatches[index].skills.map(
												(s) => (
													<span
														key={s.name}
														className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
													>
														{s.name}
													</span>
												)
											)}
										</div>
									</div>

									{/* Languages */}
									{topMatches[index].languages?.length >
										0 && (
										<div className="mb-3">
											<p className="text-sm font-inter font-bold text-gray-500 mb-1">
												Languages
											</p>
											<div className="flex flex-wrap gap-2">
												{topMatches[
													index
												].languages.map((lang) => (
													<span
														key={lang.name}
														className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
													>
														{lang.name} (
														{lang.proficiency})
													</span>
												))}
											</div>
										</div>
									)}

									{/* Strengths */}
									{topMatches[index].strengths?.length >
										0 && (
										<div>
											<p className="text-sm font-inter font-bold text-gray-500 mb-1">
												Strengths
											</p>
											<div className="flex flex-wrap gap-2">
												{topMatches[
													index
												].strengths.map((strength) => (
													<span
														key={strength.name}
														className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
													>
														{strength.name} (
														{strength.level})
													</span>
												))}
											</div>
										</div>
									)}

									{/* Bio */}
									<p className="text-sm text-gray-700 mt-4 flex-1 whitespace-pre-wrap">
										{topMatches[index].bio}
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="flex gap-10 mt-10">
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => handleAction("reject")}
						className="relative group w-16 h-16 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
					>
						<XMarkIcon className="w-8 h-8" />
						<span className="absolute -top-[-74px] z-1 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
							Reject
						</span>
					</motion.button>

					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => setOpenMessageModal(true)}
						className="relative group w-16 h-16 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
					>
						<PaperAirplaneIcon className="w-8 h-8" />
						<span className="absolute -top-[-74px] z-1 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
							Request
						</span>
					</motion.button>
				</div>
			</div>

			<AnimatePresence>
				{openMessageModal && (
					<motion.div
						className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 relative"
							initial={{ y: 50, opacity: 0, scale: 0.95 }}
							animate={{ y: 0, opacity: 1, scale: 1 }}
							exit={{ y: 50, opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<h3 className="text-lg font-semibold">
								Send a request message to{" "}
								{topMatches[index].name}
							</h3>

							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message..."
								className="border border-gray-300 rounded-xl p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
								rows={4}
							/>

							<div className="flex justify-end gap-3 mt-2">
								<button
									className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
									onClick={() => setOpenMessageModal(false)}
								>
									Cancel
								</button>
								<button
									className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
									onClick={() =>
										handleAction("accept", message)
									}
								>
									Send
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TopMatches;
