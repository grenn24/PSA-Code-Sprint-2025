import { BellIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import websocketService from "../utilities/websocket";
import { WebsocketMessage } from "@common/types/http";
import userService from "services/user";
import { useAppSelector } from "redux/store";
import { User } from "@common/types/user";

const Notifications = () => {
	const { user } = useAppSelector((state) => state.user);
	const [notifications, setNotifications] = useState<User["notifications"]>(
		[]
	);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	useEffect(() => {
		if (!user?._id) return;
		userService.getUserByID(user?._id).then((user) => {
			setNotifications(user.notifications);
		});
		const handleMessage = (message: WebsocketMessage) => {
			if (message.type === "NEW_NOTIFICATION") {
				setNotifications((prev) => [...prev, message.data]);
			}
		};

		websocketService.addListener(handleMessage);
		return () => {
			websocketService.removeListener(handleMessage);
		};
	}, []);

	return (
		<div className="relative">
			{/* Bell Button */}
			<button
				className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-transform relative bg-white/80 backdrop-blur-md"
				onClick={() => setDropdownOpen(!dropdownOpen)}
			>
				<BellIcon className="w-6 h-6 text-gray-700" />
				{notifications.length > 0 && (
					<span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full shadow">
						{notifications.length}
					</span>
				)}
			</button>

			{/* Dropdown */}
			{dropdownOpen && (
				<div className="absolute right-0 mt-5 w-80 max-h-96 overflow-y-auto bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg ring-1 ring-white/30 animate-fadeIn z-50">
					{/* Header fixed */}
					<div className="sticky top-0 bg-white backdrop-blur-xl px-4 py-2 border-b border-white/20 font-semibold text-gray-800 text-sm z-10">
						Notifications
					</div>

					{notifications.length === 0 ? (
						<div className="p-4 text-gray-300 text-sm text-center">
							No notifications
						</div>
					) : (
						<ul className="flex flex-col">
							{notifications.map((n, idx) => (
								<li
									key={idx}
									className={`px-4 py-3 transition hover:bg-white/20 cursor-pointer ${
										n.read ? "bg-white/10" : "bg-white/20"
									} ${
										idx !== notifications.length - 1
											? "border-b border-white/20"
											: ""
									}`}
								>
									<p className="text-sm text-gray-900 font-medium">
										{n.message}
									</p>
									<span className="text-xs text-gray-400">
										{new Date(n.createdAt).toLocaleString()}
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default Notifications;
