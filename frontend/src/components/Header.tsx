import { useState } from "react";
import {
	ChatBubbleOvalLeftIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
	Bars3Icon,
	XMarkIcon,
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
	const [searchOpen, setSearchOpen] = useState(false);
	const { chats } = useMentorMatchContext();

	const chatsWithUnreadMessages = chats.filter((c) =>
		c.messages?.some((m) => !m.read && m.sender !== user?._id)
	);

	return (
		<header className="flex items-center justify-between bg-white px-2 md:px-4 h-14 border-b border-gray-200 sticky top-0 z-50">
			{/* Left side: logo / search */}
			<div className="flex items-center gap-3 flex-1">
				{/* Mobile menu toggle (future use) */}
				<button
					onClick={() => setSearchOpen(!searchOpen)}
					className="md:hidden p-2 rounded-lg hover:bg-gray-100"
				>
					{searchOpen ? (
						<XMarkIcon className="w-6 h-6 text-gray-700" />
					) : (
						<MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
					)}
				</button>

				{/* Search bar (desktop only) */}
				<div className="hidden md:block relative w-full max-w-md">
					<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
					<input
						type="text"
						placeholder="Search"
						className="w-full pl-10 pr-4 py-1.5 rounded-full border border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
					/>
				</div>
			</div>

			{/* Right side: icons */}
			<div className="flex items-center gap-2 md:gap-3">
				{/* Chat / messages */}
				<div className="relative group">
					<button
						className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-transform relative"
						onClick={() => navigate("mentor?tab=Chat")}
					>
						<ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-700" />
						{chatsWithUnreadMessages.length > 0 && (
							<span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full shadow">
								{chatsWithUnreadMessages.length}
							</span>
						)}
					</button>
					<span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
						Messages
					</span>
				</div>

				{/* Notifications */}
				<div className="relative group">
					<Notifications />
					<span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
						Notifications
					</span>
				</div>

				{/* User dropdown */}
				<div className="relative">
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center space-x-2 p-1.5 md:p-2 rounded-lg hover:bg-gray-100"
					>
						<img
							src={user?.avatar || "/images/default-avatar.png"}
							alt="avatar"
							className="w-8 h-8 rounded-full"
						/>
						<span className="hidden md:block text-gray-800 font-medium">
							{user?.name}
						</span>
						<ChevronDownIcon className="hidden md:block w-4 h-4 text-gray-600" />
					</button>

					{dropdownOpen && (
						<div className="absolute right-0 mt-3 w-40 md:w-48 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50">
							<ul className="flex flex-col py-1 text-sm">
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
										className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Search Dropdown */}
			{searchOpen && (
				<div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 p-3 md:hidden">
					<div className="relative">
						<MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
						/>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
