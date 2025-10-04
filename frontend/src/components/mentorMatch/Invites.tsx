import { motion } from "framer-motion";
import { useAppSelector } from "../../redux/store";
import userService from "../../services/user";
import { User } from "@common/types/user";
import { useEffect, useState } from "react";

const PendingInvites = () => {
	const { user } = useAppSelector((state) => state.user);

	const [mentorshipRequests, setMentorshipRequests] = useState<
		User["mentorshipRequests"]
	>(user?.mentorshipRequests || []);

	useEffect(() => {
		userService.getUserByID(user?._id).then((user) => {
			setMentorshipRequests(user.mentorshipRequests);
		});
	}, [user]);

	const acceptInvite = async (
		request: User["mentorshipRequests"][number]
	) => {
		const newUser = await userService.updateUser(user?._id, {
			mentorshipRequests: user?.mentorshipRequests?.filter(
				(req) => req._id !== request._id
			),
			mentees: [...(user?.mentees || []), request.sender?._id],
		});
		setMentorshipRequests(newUser.mentorshipRequests);
	};

	const rejectInvite = async (
		request: User["mentorshipRequests"][number]
	) => {
		const newUser = await userService.updateUser(user?._id, {
			mentorshipRequests: user?.mentorshipRequests?.filter(
				(req) => req._id !== request._id
			),
		});
		setMentorshipRequests(newUser.mentorshipRequests);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -15 }}
			className="space-y-6"
		>
			<h2 className="text-lg font-semibold text-indigo-700">
				Pending Mentorship Requests
			</h2>
			{mentorshipRequests.length === 0 && (
				<div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
					<p className="text-3xl mb-2">No pending requests</p>
					<p className="text-sm">
						You're all caught up. Check back later or keep
						connecting with mentors!
					</p>
				</div>
			)}
			<div className="grid sm:grid-cols-2 gap-4">
				{mentorshipRequests?.map((invite, i) => (
					<div
						key={i}
						className="p-4 bg-white rounded-2xl shadow border border-gray-100 flex flex-col justify-between"
					>
						<div className="flex items-center gap-3">
							{/* Sender Avatar */}
							<img
								src={invite.sender?.avatar}
								alt={invite.sender?.name}
								className="w-14 h-14 rounded-full object-cover"
							/>
							<div>
								<h3 className="font-medium text-gray-800">
									{invite.sender?.name}
								</h3>
								<p className="text-sm text-gray-500">
									{invite.sender?.position}
								</p>
							</div>
						</div>

						{invite.message && (
							<hr className="my-4 border-gray-200" />
						)}

						{/* Message text */}
						{invite.message && (
							<p className="text-sm text-gray-600">
								{invite.message}
							</p>
						)}

						<div className="flex gap-2 mt-6">
							<button
								onClick={() => acceptInvite(invite)}
								className="text-md bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200"
							>
								Accept
							</button>
							<button
								onClick={() => rejectInvite(invite)}
								className="text-md bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200"
							>
								Reject
							</button>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default PendingInvites;
