import { useState } from "react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import authService from "../services/auth";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const validatePassword = (pwd: string) => {
		const hasLetter = /[A-Za-z]/.test(pwd);
		const hasNumber = /[0-9]/.test(pwd);
		return pwd.length >= 8 && hasLetter && hasNumber;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (!email || !password) {
			setError("Please fill in both email and password.");
			return;
		}

		if (!validatePassword(password)) {
			setError(
				"Password must be at least 8 characters and contain letters and numbers."
			);
			return;
		}

		try {
			await authService.signup(email, password);
			setEmail("");
			setPassword("");
		} catch (err) {
			if (err.body?.status === "DUPLICATE_EMAIL") {
				setError("Email is already used by an existing user.");
			}
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left: Sign-up form */}
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
						Create your account
					</h2>
					<p className="text-center text-gray-500 text-sm">
						Join PSA Horizon today
					</p>

					{/* Error / Success messages */}
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
								className={`w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 placeholder-gray-400 transition ${
									error
										? "border-red-400 focus:ring-red-500"
										: "border-gray-300 focus:ring-indigo-500"
								} ${error ? "text-red-500" : "text-gray-700"}`}
							/>
						</div>

						{/* Password */}
						<div className="relative">
							<LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => {
									setError(null);
									setPassword(e.target.value);
								}}
								required
								className={`w-full pl-10 pr-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 placeholder-gray-400 transition ${
									error
										? "border-red-400 focus:ring-red-500"
										: "border-gray-300 focus:ring-indigo-500"
								} ${error ? "text-red-500" : "text-gray-700"}`}
							/>
							<p
								className={`text-xs text-gray-400 ${
									error ? "text-red-500" : "text-gray-400"
								}`}
							>
								At least 8 characters, with letters and numbers.
							</p>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
						>
							Sign Up
						</button>
					</form>
					<div className="text-center text-sm text-gray-600">
						Already using PSA Horizon?{" "}
						<button
							onClick={() => navigate("/log-in")}
							className="text-blue-600 hover:text-blue-800 font-semibold"
						>
							Log in here
						</button>
					</div>

					<div className="text-center text-gray-400 text-sm">
						© 2025 PSA. All rights reserved.
					</div>
				</div>
			</div>

			<div className="hidden md:flex w-1/2 relative">
				<img
					src="/images/port-background.jpg"
					alt="Port Background"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-blue-800/50 to-transparent flex flex-col justify-center items-start p-16 space-y-4 text-white">
					<h1 className="text-5xl font-extrabold drop-shadow-lg">
						Welcome to PSA Horizon
					</h1>
					<p className="text-lg drop-shadow-sm">
						Empowering employee growth and innovation.
					</p>
				</div>
				<div className="absolute bottom-0 left-0 w-1/2 h-32 bg-gradient-to-r from-purple-700/50 to-transparent rounded-tr-3xl"></div>
			</div>
		</div>
	);
};

export default SignUp;
