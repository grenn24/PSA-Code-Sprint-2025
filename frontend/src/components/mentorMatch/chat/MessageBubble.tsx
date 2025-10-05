import { Message } from "@common/types/chat";
import dayjs from "dayjs";

interface Prop {
	isSender: boolean
    message: Message
}
const MessageBubble = ({isSender, message}:Prop) => {
	return (
		<div
			key={message._id}
			className={`flex ${isSender ? "justify-end" : "justify-start"}`}
		>
			<div
				className={`py-1 px-2 rounded-2xl max-w-[70%] ${
					isSender
						? "bg-green-200/80 text-green-900 rounded-br-none"
						: "bg-gray-200/80 text-gray-800 rounded-bl-none"
				}`}
			>
				<div className="flex flex-col items-end">
					<p>{message.content}</p>
					<div className="flex items-center gap-0 text-xs text-gray-700">
						<span>{dayjs(message.createdAt).format("h:mm a")}</span>
						{isSender && (
							<span
								className={`ml-1 ${
									message.read
										? "text-blue-500"
										: "text-gray-700"
								}`}
							>
								{message.read ? "✓✓" : "✓"}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
