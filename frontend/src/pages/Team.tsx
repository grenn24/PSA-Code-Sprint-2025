import React, { useEffect, useState } from "react";
import { setUser } from "redux/slices/user";
import { useAppDispatch, useAppSelector } from "redux/store";
import userService from "services/user";
import { User } from "@common/types/user";
import { Dialog } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";

interface Ratings {
	communication: number;
	decisionMaking: number;
	strategicThinking: number;
	teamwork: number;
	adaptability: number;
}

const defaultRatings: Ratings = {
	communication: 0,
	decisionMaking: 0,
	strategicThinking: 0,
	teamwork: 0,
	adaptability: 0,
};

const Team = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [subordinates, setSubordinates] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [ratings, setRatings] = useState<Ratings>(defaultRatings);
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

	const handleRatingChange = (field: keyof Ratings, value: number) => {
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
						className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition cursor-pointer"
						onClick={() => openReviewModal(sub)}
					>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700">
								{sub.name[0]}
							</div>
							<div>
								<p className="text-lg font-semibold">
									{sub.name}
								</p>
								<p className="text-sm text-gray-500">
									{sub.position}
								</p>
								<p className="text-xs text-gray-400">
									{sub.department}
								</p>
							</div>
						</div>
						<div className="mt-2 flex justify-between items-center">
							<p className="text-sm text-gray-600">
								{sub.skills?.length || 0} Skills
							</p>
							<p className="text-sm text-gray-600">
								{sub.projects?.length || 0} Projects
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Review Modal */}
			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			>
				<Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
					<Dialog.Title className="text-xl font-bold">
						Review {selectedUser?.name}
					</Dialog.Title>
					<div className="space-y-3">
						{Object.keys(defaultRatings).map((key) => (
							<div key={key}>
								<label className="block text-sm font-medium capitalize text-gray-700">
									{key.replace(/([A-Z])/g, " $1")}
								</label>
								<div className="flex gap-1 mt-1">
									{[1, 2, 3, 4, 5].map((val) => (
										<StarIcon
											key={val}
											className={`h-6 w-6 cursor-pointer ${
												val <=
												ratings[key as keyof Ratings]
													? "text-yellow-400"
													: "text-gray-300"
											}`}
											onClick={() =>
												handleRatingChange(
													key as keyof Ratings,
													val
												)
											}
										/>
									))}
								</div>
							</div>
						))}
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Comments
							</label>
							<textarea
								className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm"
								rows={3}
								value={comments}
								onChange={(e) => setComments(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<button
							className="px-4 py-2 bg-gray-200 rounded-md"
							onClick={() => setIsModalOpen(false)}
						>
							Cancel
						</button>
						<button
							className="px-4 py-2 bg-indigo-600 text-white rounded-md"
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
