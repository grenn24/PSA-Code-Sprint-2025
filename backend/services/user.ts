import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import websocketService from "../utilities/websocket.js";
import mongoose from "mongoose";
import Chat from "../models/chat.js";

class UserService {
	// Get all users
	async getAllUsers() {
		return await User.find().exec();
	}

	// Create a new user
	async createUser(userData) {
		const {
			name,
			email,
			password,
			role,
			position,
			supervisor,
			subordinates,
			avatar,
			experienceLevel,
		} = userData;

		// Check if email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new HttpError("Email already in use");
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user document
		const user = new User({
			name,
			email,
			password: hashedPassword,
			role,
			position,
			supervisor,
			subordinates,
			avatar,
			experienceLevel,
		});

		// Save to DB
		return await user.save();
	}

	async getUserByID(userId) {
		const user = await User.findById(userId)
			.populate("supervisor")
			.populate("subordinates")
			.populate("mentors")
			.populate("mentees")
			.populate("mentorshipRequests.sender")
			.exec();
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		return user;
	}

	async updateUser(userId, userData) {
		const user = await User.findById(userId);
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const updatedUser = await User.findByIdAndUpdate(userId, userData, {
			new: true,
		});
		return updatedUser;
	}

	async addNotification(userId: string, message: string) {
		// Add to DB
		const user = await User.findByIdAndUpdate(
			userId,
			{
				$push: {
					notifications: {
						message,
						read: false,
						createdAt: new Date(),
					},
				},
			},
			{ new: true }
		);

		if (!user)
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);

		const notifications = user.notifications;

		websocketService.sendTo(userId, {
			type: "NOTIFICATIONS",
			data: notifications,
			timestamp: new Date().toISOString(),
		});

		return user;
	}

	async sendMentorshipRequest(
		senderID: string,
		mentorID: string,
		message?: string
	) {
		const sender = await User.findById(senderID);
		if (!sender)
			throw new HttpError(
				"Sendernot found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		const mentor = await User.findById(mentorID);
		if (!mentor)
			throw new HttpError(
				"Mentor not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		mentor.mentorshipRequests.push({
			sender: senderID,
			message,
		});
		await mentor.save();
		await this.addNotification(
			mentorID,
			`${sender.name} sent you a mentorship request\n${message}`
		);
	}

	async getChats(userId: string) {
		const user = await User.findById(userId);
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const chats = Chat.find({
			participants: {
				$in: [userId],
			},
		});
		return chats;
	}

	async getNotifications(userId: string) {
		const user = await User.findById(userId);
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		return user.notifications;
	}

	async getTopMatchedMentors(
		userId: string,
		limit?: number,
		page: number = 0
	) {
		const mentee = await User.findById(userId).populate("mentors").exec();
		if (!mentee)
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);

		const mentors = await User.find({
			_id: {
				$ne: userId,
				$nin: (mentee as any).mentors?.map(
					(mentor) => new mongoose.Types.ObjectId(mentor._id)
				),
			},
			experienceLevel: { $gte: mentee.experienceLevel },
			mentorshipRequests: {
				$not: {
					$elemMatch: { sender: new mongoose.Types.ObjectId(userId) },
				},
			},
		})
			.populate("supervisor")
			.populate("subordinates")
			.populate("mentors")
			.populate("mentees")
			.populate("mentorshipRequests.sender")
			.exec();

		const w1 = 0.4;
		const w2 = 0.2;
		const w3 = 0.3;

		const scoredMentors = mentors.map((mentor) => {
			const skill_alignment = this.calculateSkillAlignment(
				mentee.skills,
				mentor.skills
			);
			const experience_diff =
				mentor.experienceLevel - mentee.experienceLevel;
			const career_path_similarity = this.calculateCareerPathSimilarity(
				mentee.careerPath,
				mentor.careerPath
			);

			const score =
				w1 * skill_alignment +
				w2 * experience_diff +
				w3 * career_path_similarity;

			return {
				mentor,
				score,
			};
		});

		return scoredMentors
			.sort((a, b) => b.score - a.score)
			.slice(
				page * (limit || scoredMentors.length),
				(limit || scoredMentors.length) * (page + 1)
			)
			.map((m) => m.mentor);
	}

	// Helper: Skill Alignment (cosine similarity–like)
	private calculateSkillAlignment(menteeSkills: any[], mentorSkills: any[]) {
		if (!menteeSkills.length || !mentorSkills.length) return 0;

		let overlap = 0;
		for (const ms of menteeSkills) {
			const match = mentorSkills.find(
				(s) => s.name.toLowerCase() === ms.name.toLowerCase()
			);
			if (match) overlap += Math.min(match.level, ms.level);
		}

		const total = mentorSkills.reduce((sum, s) => sum + s.level, 0);
		return total ? overlap / total : 0;
	}

	private calculateCareerPathSimilarity(
		menteePath: any[],
		mentorPath: any[]
	) {
		const menteePositions = new Set(menteePath.map((p) => p.position));
		const mentorPositions = new Set(mentorPath.map((p) => p.position));

		const intersection = [...menteePositions].filter((p) =>
			mentorPositions.has(p)
		);
		const union = new Set([...menteePositions, ...mentorPositions]);

		return union.size > 0 ? intersection.length / union.size : 0;
	}

	async deleteAllUsers() {
		return await User.deleteMany({}).exec();
	}
}

const userService = new UserService();
export default userService;
