import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
	HomeIcon,
	BriefcaseIcon,
	UserIcon,
	UsersIcon,
	CalendarIcon,
	ChatBubbleLeftRightIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import { useAppSelector } from "../redux/store";
import { useWebsocket } from "../utilities/hooks";

const routes = [
	{ path: "/", label: "Homepage", icon: <HomeIcon className="w-6 h-6" /> },
	{
		path: "/career",
		label: "Career Roadmap",
		icon: <BriefcaseIcon className="w-6 h-6" />,
	},
	{
		path: "/profile",
		label: "Profile Page",
		icon: <UserIcon className="w-6 h-6" />,
	},
	{
		path: "/mentor",
		label: "Mentor Match",
		icon: <UsersIcon className="w-6 h-6" />,
	},
	{
		path: "/events",
		label: "Events",
		icon: <CalendarIcon className="w-6 h-6" />,
	},
	{
		path: "/wellness",
		label: "WellnessBuddy",
		icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
	},
];

const MainLayout = () => {
	useWebsocket();
	const [open, setOpen] = useState(true);
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated && location.pathname !== "/log-in") {
			navigate("/log-in");
		}
	}, [isAuthenticated, location.pathname, navigate]);

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div
				className={`${
					open ? "w-64" : "w-20"
				} bg-white shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200 pb-2`}
			>
				{/* Sidebar Header */}
				<div className="flex justify-center p-4">
					<img src="/images/psa-logo.png" alt="PSA" className="h-6" />
				</div>

				{/* Sidebar Menu */}
				<nav className="flex-1 p-2 space-y-1 relative">
					{routes.map((r, idx) => {
						const isActive = location.pathname === r.path;

						return (
							<div key={idx} className="relative group">
								<button
									onClick={() => navigate(r.path)}
									className={`flex items-center w-full px-3 py-2 rounded-lg transition
                    ${open ? "justify-start" : "justify-center"}
                    ${
						isActive
							? "bg-blue-100 text-blue-700"
							: "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
					}`}
								>
									<div className="flex-shrink-0">
										{r.icon}
									</div>
									<span
										className={`font-medium whitespace-nowrap transition-all duration-200 ${
											open
												? "ml-3 opacity-100 w-auto"
												: "opacity-0 w-0 absolute pointer-events-none"
										}`}
									>
										{r.label}
									</span>
								</button>

								{/* Tooltip */}
								{!open && (
									<div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-md bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
										{r.label}
									</div>
								)}
							</div>
						);
					})}
				</nav>
				<button
					className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0 m-auto"
					onClick={() => setOpen(!open)}
				>
					{open ? (
						<ArrowLeftIcon className="w-6 h-6 text-gray-600" />
					) : (
						<ArrowRightIcon className="w-6 h-6 text-gray-600" />
					)}
				</button>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				<Header />
				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
