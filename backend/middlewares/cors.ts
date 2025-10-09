import { NextFunction, Request, Response } from "express";

// Cors middleware for cross origin requests (backend server hosted independently)
export default function cors(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const allowedOrigins = [
		"http://localhost:5173",
		"http://localhost",
		"https://psa-code-sprint-2025.vercel.app",
	];

	const origin = request.header("Origin");
	if (origin && allowedOrigins.includes(origin)) {
		response.setHeader("Access-Control-Allow-Origin", origin);
	}

	response.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, X-Access-Token, Authorization, Accept-Language"
	);
	response.setHeader("Access-Control-Expose-Headers", "X-Access-Token");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Max-Age", "1728000");

	// Respond immediately for OPTIONS requests
	if (request.method === "OPTIONS") {
		response.sendStatus(204);
	}
	next();
}
