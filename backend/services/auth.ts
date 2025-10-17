import { HttpError } from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { generateUser } from "../scripts/mongodb/user.js";
import { generateChats } from "../scripts/mongodb/chat.js";
import Chat from "../models/chat.js";

class AuthService {
	async login(email: string, password: string) {
		const user = await User.findOne({ email: email.toLowerCase() })
			.populate("supervisor")
			.populate("subordinates")
			.populate("mentors")
			.populate("mentees")
			.populate("mentorshipRequests.sender")
			.exec();
		if (!user) {
			throw new HttpError(
				"Invalid email or password",
				"INVALID_EMAIL_PASSWORD",
				401
			);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new HttpError(
				"Invalid email or password",
				"INVALID_EMAIL_PASSWORD",
				401
			);
		}

		const payload = {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			position: user.position,
		};

		const token = jwt.sign(payload, config.get<string>("SECRET_KEY"), {
			expiresIn: "1d",
		});

		return { token, user };
	}

	async signup(email: string, password: string) {
		const existingUser = await User.findOne({
			email: email.toLowerCase(),
		}).exec();
		if (existingUser) {
			throw new HttpError(
				`Email is already used by an existing user`,
				"DUPLICATE_EMAIL",
				400
			);
		}

		const newUser = new User(await generateUser(email, password));
		await Chat.insertMany(await generateChats(newUser.email));
		newUser.email = email.toLowerCase();
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(password, salt);
		await newUser.save();
		const user = await User.findOne({ email: email.toLowerCase() })
			.populate("supervisor")
			.populate("subordinates")
			.populate("mentors")
			.populate("mentees")
			.populate("mentorshipRequests.sender")
			.exec();

		const payload = {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			position: newUser.position,
		};

		const token = jwt.sign(payload, config.get<string>("SECRET_KEY"), {
			expiresIn: "1d",
		});

		return { token, user };
	}

	async validateAccessToken(accessToken: string) {
		try {
			const payload = jwt.verify(
				accessToken,
				config.get("SECRET_KEY") as string
			);
			if (typeof payload !== "string") {
				return payload;
			}
		} catch (err) {
			return false;
		}
	}
}

const authService = new AuthService();

export default authService;
