import { User } from "@common/types/user";
import dayjs from "dayjs";
import React from "react";

interface Prop {
	recipient: User;
    type: "mentor" | "mentee";
}
const ChatHeader = ({ recipient,type }: Prop) => {
	return (
		<div className="bg-white w-full flex items-center gap-3 py-2 px-4 border-b border-gray-200">
			<img
				src={recipient.avatar}
				alt={recipient.name}
				className="w-9 h-9 rounded-full object-cover"
			/>
			<div className="flex-1">
				<h3 className="font-semibold text-gray-800">
					{recipient.name}
				</h3>

				{recipient.isOnline ? (
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
						<span className="text-green-600 text-sm">Online</span>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 bg-gray-400 rounded-full"></span>
						<p className="text-sm text-gray-500">
							Last seen{" "}
							{recipient?.lastSeen
								? dayjs(recipient.lastSeen).fromNow()
								: "a long time ago"}
						</p>
					</div>
				)}
			</div>
			<span
				className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
					type === "mentee"
						? "bg-green-100 text-green-800"
						: "bg-blue-100 text-blue-800"
				}`}
			>
				{type === "mentee"
					? "Mentee"
					: "Mentor"}
			</span>
		</div>
	);
};

export default ChatHeader;
