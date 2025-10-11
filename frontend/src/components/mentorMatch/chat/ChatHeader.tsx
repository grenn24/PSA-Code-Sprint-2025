import { User } from "@common/types/user";
import { ArrowLeftIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { useVideoCallContext } from "context/VideoCallContext";
import dayjs from "dayjs";
import chatService from "services/chat";

interface Prop {
	setChatID: React.Dispatch<React.SetStateAction<string | null>>;
	chatID: string;
	recipient: User;
	type: "mentor" | "mentee";
}
const ChatHeader = ({ setChatID, recipient, type, chatID }: Prop) => {
	const { setTargetUserID } = useVideoCallContext();
	return (
		<div className="bg-white w-full flex items-center gap-3 p-2 border-b border-gray-200">
			<button
				onClick={() => setChatID(null)}
				className="p-1.5 rounded-full hover:bg-gray-100"
			>
				<ArrowLeftIcon className="w-5 h-5" />
			</button>
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
			<div className="relative group">
				<button
					onClick={() => {
						if (!recipient?._id) return;
						setTargetUserID(recipient._id);
						chatService.offerVideoCall(recipient._id, chatID);
					}}
					className="p-2 rounded-full hover:bg-gray-100 transition"
				>
					<VideoCameraIcon className="w-5 h-5 text-gray-600" />
				</button>
				<span className="absolute -top-[-40px] z-1 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
					Video Call
				</span>
			</div>
			<span
				className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
					type === "mentee"
						? "bg-green-100 text-green-800"
						: "bg-blue-100 text-blue-800"
				}`}
			>
				{type === "mentee" ? "Mentee" : "Mentor"}
			</span>
		</div>
	);
};

export default ChatHeader;
