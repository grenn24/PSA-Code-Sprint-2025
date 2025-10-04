import { useState } from "react";
import {
	ChevronDownIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../redux/store";
import authService from "../services/auth";
import Notifications from "./Notifications";

const Header = () => {
	const { user } = useAppSelector((state) => state.user);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<header className="flex items-center justify-between bg-white px-6 h-16 border-b-1 border-gray-200">
			{/* Left: Search bar */}
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

			{/* Right: Notifications + Employee */}
			<div className="flex items-center space-x-4 ml-6">
				{/* Notifications */}
				<Notifications />

				{/* Employee Dropdown */}
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

					{/* Dropdown Menu */}
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
