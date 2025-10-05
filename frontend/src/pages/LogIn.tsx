import { useState } from "react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import authService from "../services/auth";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const LogIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await authService.login(email, password);
		} catch (err) {
			console.log(err);
			if (err.body?.status === "INVALID_EMAIL_PASSWORD") {
				setError("Invalid email or password.");
			}
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left: Port image */}
			<div className="hidden md:flex w-1/2 relative">
				<img
					src="/images/port-background.jpg"
					alt="Port Background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-blue-800/50 to-transparent flex flex-col justify-center items-start p-16 space-y-4 text-white">
					<h1 className="text-5xl font-extrabold drop-shadow-lg">
						PSA Horizon
					</h1>
					<p className="text-lg drop-shadow-sm">
						Empowering employee growth and innovation.
					</p>
				</div>
				{/* Optional geometric accent */}
				<div className="absolute bottom-0 left-0 w-1/2 h-32 bg-gradient-to-r from-purple-700/50 to-transparent rounded-tr-3xl"></div>
			</div>

			{/* Right: Login form */}
			<div className="flex flex-1 justify-center items-center bg-gray-50 p-8">
				<div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-8 relative">
					{/* Logo */}
					<div className="flex justify-center">
						<img
							src="/images/psa-logo.png"
							alt="PSA Logo"
							className="h-14 w-auto"
						/>
					</div>

					<h2 className="text-center text-2xl font-bold text-gray-900">
						Sign in to your account
					</h2>
					<p className="text-center text-gray-500 text-sm">
						Enter your credentials to continue
					</p>

					{/* Error message */}
					{error && (
						<div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm">
							<ExclamationCircleIcon className="h-5 w-5" />
							<span>{error}</span>
						</div>
					)}

					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Email */}
						<div className="relative">
							<UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
							<input
								type="email"
								placeholder="Email"
								inputMode="email"
								value={email}
								onChange={(e) => {
									setError(null);
									setEmail(e.target.value);
								}}
								required
								className={`w-full pl-10 pr-4 py-3 rounded-2xl border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
									error
										? "border-red-400 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								} ${
									error ? "text-red-400" : "text-gray-400"
								} placeholder-gray-400 transition`}
							/>
						</div>

						{/* Password */}
						<div className="relative">
							<LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
							<input
								type="password"
								placeholder="Password"
								inputMode="text"
								value={password}
								onChange={(e) => {
									setError(null);
									setPassword(e.target.value);
								}}
								required
								className={`w-full pl-10 pr-4 py-3 rounded-2xl border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
									error
										? "border-red-400 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								} ${
									error ? "text-red-400" : "text-gray-400"
								} placeholder-gray-400 transition`}
							/>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
						>
							Sign In
						</button>
					</form>

					{/* Footer */}
					<div className="text-center text-gray-400 text-sm">
						© 2025 PSA. All rights reserved.
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
