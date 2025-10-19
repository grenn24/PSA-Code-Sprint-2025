import React, { useEffect, useState } from "react";
import { setUser } from "redux/slices/user";
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { LeadershipReviewRatings, User } from "@common/types/user";
import { Dialog } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";

const defaultRatings: LeadershipReviewRatings = {
	communication: 0,
	decisionMaking: 0,
	strategicThinking: 0,
	teamwork: 0,
	adaptability: 0,
};

const ratingDescriptions: Record<keyof LeadershipReviewRatings, string> = {
	communication: "Effectively conveys ideas and listens actively.",
	decisionMaking: "Makes informed and timely decisions.",
	strategicThinking: "Sees the big picture and plans ahead.",
	teamwork: "Collaborates and supports team members.",
	adaptability: "Adjusts to changing circumstances smoothly.",
};

const Team = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [subordinates, setSubordinates] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [ratings, setRatings] =
		useState<LeadershipReviewRatings>(defaultRatings);
	const [comments, setComments] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!user?._id) return;
		userService.getUserByID(user?._id).then((u) => {
			dispatch(setUser(u));
			setSubordinates(u.subordinates || []);
		});
	}, [user?._id]);

	const openReviewModal = (sub: User) => {
		setSelectedUser(sub);
		setRatings(defaultRatings);
		setComments("");
		setIsModalOpen(true);
	};

	const handleRatingChange = (
		field: keyof LeadershipReviewRatings,
		value: number
	) => {
		setRatings((prev) => ({ ...prev, [field]: value }));
	};

	const submitReview = async () => {
		if (!selectedUser?._id) return;
		await userService.submitLeadershipReview(selectedUser._id, {
			ratings,
			comments,
			date: new Date(),
		});
		setIsModalOpen(false);
	};

	return (
		<div className="min-h-dvh p-8 space-y-6">
			<h1 className="text-3xl font-bold text-gray-900">My Team</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{subordinates.map((sub) => (
					<div
						key={sub._id}
						className="bg-white rounded-xl shadow-md transition p-5 flex flex-col gap-4"
					>
						<div className="flex items-center gap-3">
							<img
								src={
									sub.avatar ||
									`https://ui-avatars.com/api/?name=${sub.name}&background=6366f1&color=fff`
								}
								alt={sub.name}
								className="w-12 h-12 rounded-full object-cover"
							/>
							<div className="flex-1">
								<p className="text-lg font-semibold text-gray-900">
									{sub.name}
								</p>
								<p className="text-sm text-gray-500">
									{sub.position}
								</p>
								<p className="text-xs text-gray-400">
									{sub.department}
								</p>
								{sub.bio && (
									<p className="text-xs text-gray-400">
										{sub.bio}
									</p>
								)}
							</div>
						</div>

						<div className="mt-2 flex justify-between items-center text-sm text-gray-600">
							<span>{sub.skills?.length || 0} Skills</span>
							<span>{sub.projects?.length || 0} Projects</span>
						</div>

						{/* Review Button */}
						<div className="mt-3">
							<button
								className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium"
								onClick={() => openReviewModal(sub)}
							>
								Add Leadership Review
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Review Modal */}
			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-inter"
			>
				<Dialog.Panel className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg space-y-6">
					<Dialog.Title className="text-3xl font-semibold text-gray-900">
						Review {selectedUser?.name}
					</Dialog.Title>

					<div className="space-y-5">
						{Object.entries(ratingDescriptions).map(
							([key, desc]) => (
								<div key={key}>
									<label className="block text-base font-medium capitalize text-gray-800">
										{key.replace(/([A-Z])/g, " $1")}
									</label>
									<p className="text-sm text-gray-500 mb-2">
										{desc}
									</p>
									<div className="flex gap-2 mt-1">
										{[1, 2, 3, 4, 5].map((val) => (
											<StarIcon
												key={val}
												className={`h-8 w-8 cursor-pointer transition-colors ${
													val <=
													ratings[
														key as keyof LeadershipReviewRatings
													]
														? "text-yellow-400"
														: "text-gray-300"
												}`}
												onClick={() =>
													handleRatingChange(
														key as keyof LeadershipReviewRatings,
														val
													)
												}
											/>
										))}
									</div>
								</div>
							)
						)}

						<div>
							<label className="block text-base font-medium text-gray-800 mb-1">
								Comments
							</label>
							<textarea
								className="w-full mt-1 border border-gray-300 rounded-xl p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
								rows={4}
								value={comments}
								onChange={(e) => setComments(e.target.value)}
								placeholder="Add your feedback here..."
							/>
						</div>
					</div>

					<div className="flex justify-end gap-3 mt-6">
						<button
							className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
							onClick={() => setIsModalOpen(false)}
						>
							Cancel
						</button>
						<button
							className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
							onClick={submitReview}
						>
							Submit
						</button>
					</div>
				</Dialog.Panel>
			</Dialog>
		</div>
	);
};

export default Team;
