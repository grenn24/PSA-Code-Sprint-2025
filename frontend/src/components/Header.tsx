import { useState } from "react";
import {
	ChatBubbleOvalLeftIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../redux/store";
import authService from "../services/auth";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import { useMentorMatchContext } from "context/MentorMatchContext";

const Header = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { chats } = useMentorMatchContext();
	const chatsWithUnreadMessages = chats.filter((c) =>
		c.messages?.some((m) => !m.read && m.sender !== user?._id)
	);

	return (
		<header className="flex items-center justify-between bg-white px-6 h-16 border-b-1 border-gray-200">
			<div className="flex items-center flex-1 max-w-md">
				<div className="relative w-full">
					<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
					<input
						type="text"
						placeholder="Search"
						className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
					/>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<button
					className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-transform relative bg-white/80 backdrop-blur-md"
					onClick={() => navigate("mentor?tab=Chat")}
				>
					<ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-700" />
					{chatsWithUnreadMessages.length > 0 && (
						<span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full shadow">
							{chatsWithUnreadMessages.length}
						</span>
					)}
				</button>
				<Notifications />
				<div className="relative">
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
					>
						<img
							src={user?.avatar}
							alt="avatar"
							className="w-8 h-8 rounded-full"
						/>
						<span className="text-gray-800 font-medium">
							{user?.name}
						</span>
						<ChevronDownIcon className="w-4 h-4 text-gray-600" />
					</button>

					{dropdownOpen && (
						<div className="absolute right-0 mt-5 w-48 border-gray-200 bg-white/80 backdrop-blur-md rounded-lg shadow-lg z-50">
							<ul className="flex flex-col py-1">
								<li>
									<button className="w-full text-left px-4 py-2 hover:bg-gray-100">
										Profile
									</button>
								</li>
								<li>
									<button className="w-full text-left px-4 py-2 hover:bg-gray-100">
										Settings
									</button>
								</li>
								<li>
									<button
										onClick={() => authService.logout()}
										className="w-full text-left px-4 py-2 hover:bg-gray-100"
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
