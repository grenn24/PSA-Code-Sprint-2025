import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import websocketService from "../utilities/websocket.js";
import mongoose from "mongoose";
import Chat from "../models/chat.js";
import WBConversation from "../models/wb.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { Position, Skill } from "@common/types/user.js";
import { Course } from "../models/course.js";

dayjs.extend(utc);
dayjs.extend(timezone);

class UserService {
	// Get all users
	async getAllUsers() {
		return await User.find().populate("mentors").exec();
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
			type: "NEW_NOTIFICATION",
			data: notifications.pop(),
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

	async addActivity(userID: string, activity) {
		const user = await User.findById(userID);
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		user.activities.push(activity);
		return await user.save();
	}

	async getChats(userID: string) {
		const user = await User.findById(userID);
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const chats = Chat.find({
			participants: {
				$in: [userID],
			},
		})
			.populate("participants")
			.exec();
		return chats;
	}

	async getNotifications(userID: string) {
		const user = await User.findById(userID);
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		return user.notifications;
	}

	async getWBConversations(userID: string) {
		const conversations = await WBConversation.find({
			user: userID,
		}).exec();
		return conversations;
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

		const excludedMentorIds = (mentee as any).mentors.map(
			(m: any) => new mongoose.Types.ObjectId(m._id)
		);

		// Compute experience in years
		const menteeExperience =
			(new Date().getTime() - mentee.hireDate.getTime()) /
			(1000 * 60 * 60 * 24 * 365);

		const candidates = await User.aggregate([
			{
				$match: {
					_id: {
						$ne: new mongoose.Types.ObjectId(userId),
						$nin: excludedMentorIds,
					},
					hireDate: { $lte: mentee.hireDate }, // only more senior mentors
					"mentorshipRequests.sender": {
						$ne: new mongoose.Types.ObjectId(userId),
					},
				},
			},
			{
				$project: {
					skills: 1,
					hireDate: 1,
					careerPath: 1,
					name: 1,
					avatar: 1,
					// compute mentor experience in years
					experience_diff: {
						$divide: [
							{ $subtract: [new Date(), "$hireDate"] },
							1000 * 60 * 60 * 24 * 365,
						],
					},
				},
			},
			{ $limit: 200 },
		]);

		const w1 = 0.4; // skill alignment
		const w2 = 0.2; // experience difference
		const w3 = 0.3; // career path similarity

		const scoredMentors = candidates.map((mentor: any) => {
			const skill_alignment = this.countOverlappingSkills(
				mentee.skills,
				mentor.skills
			);

			const mentorExperience =
				(new Date().getTime() - new Date(mentor.hireDate).getTime()) /
				(1000 * 60 * 60 * 24 * 365);
			const experience_diff = mentorExperience - menteeExperience;

			const career_path_similarity = this.calculateCareerPathSimilarity(
				mentee.careerPath,
				mentor.careerPath
			);

			const score =
				w1 * skill_alignment +
				w2 * experience_diff +
				w3 * career_path_similarity;

			return { mentor, score };
		});

		return scoredMentors
			.sort((a, b) => b.score - a.score)
			.slice(
				page * (limit || scoredMentors.length),
				(limit || scoredMentors.length) * (page + 1)
			)
			.map((m) => m.mentor);
	}

	// Skills overlap
	private countOverlappingSkills(
		menteeSkills,
		mentorSkills
	) {
		const menteeSkillNames = new Set(
			menteeSkills.map((s) => s.name.toLowerCase())
		);
		return mentorSkills.filter((s) =>
			menteeSkillNames.has(s.name.toLowerCase())
		).length;
	}

	// Career path similarity
	private calculateCareerPathSimilarity(
		menteePath: any[],
		mentorPath: any[]
	) {
		const menteePositions = new Set(menteePath.map((p) => p.name));
		const mentorPositions = new Set(mentorPath.map((p) => p.name));

		const intersection = [...menteePositions].filter((p) =>
			mentorPositions.has(p)
		);
		const union = new Set([...menteePositions, ...mentorPositions]);

		return union.size > 0 ? intersection.length / union.size : 0;
	}
	async deleteAllUsers() {
		return await User.deleteMany({}).exec();
	}

	async updateTodayMood(userId: string, level: number, notes: string[] = []) {
		const todayStart = dayjs().tz("Asia/Singapore").startOf("day");
		const user = await User.findById(userId);
		if (!user)
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);

		user.moods.push({ date: todayStart, level, notes });

		await user.save();
		return user.moods[user.moods.length - 1];
	}

	async getRecommendedCourses(userID: string) {
		const user = await User.findById(userID).exec();
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}

		// Compute skill gap for current position
		let skillGaps: Skill[] = [];
		const currentUserPosition = await this.getCurrentPosition(userID);
		if (currentUserPosition) {
			// ignore skills completed
			const missingSkills = currentUserPosition.skills
				.filter(
					(s) =>
						!(
							user.skills.some((us) => us.name === s.name) &&
							s.level === 100
						)
				)
				.map((s) => ({
					...s,
					level:
						user.skills.find((us) => us.name === s.name)?.level ??
						0,
				}));
			skillGaps = missingSkills;
		}

		const courses = await Course.find().exec();

		// Score each course
		const scoredCourses = courses
			.map((course) => {
				let relevance = 0;

				course.skillsTaught.forEach((cs) => {
					const gap = skillGaps.find((g) => g.name === cs.name);
					if (gap) {
						// Skill name
						relevance += 3;

						// Function area
						if (gap.functionArea === cs.functionArea)
							relevance += 2;

						// Specialisation
						if (gap.specialisation === cs.specialisation)
							relevance += 1;

						// Aspirations
						const inAspirations = user.aspirations.some((role) =>
							role.skills.some((s) => s.name === cs.name)
						);
						if (inAspirations) relevance += 5;

						// Skill level gap
						if (!gap.level) return;
						relevance += Math.max(0, 100 - gap.level) / 50;
					}
				});

				return { course, relevance };
			})
			.filter((c) => c.relevance > 0)
			.sort((a, b) => b.relevance - a.relevance)
			.map((c) => c.course);

		return scoredCourses.slice(0, 10);
	}

	async getCurrentPosition(userID: string) {
		const user = await User.findById(userID).lean().exec();
		if (!user) {
			throw new HttpError(
				"User not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const currentRole: Position | undefined = user.careerPath.find(
			(pos) => !pos.endDate
		) as Position | undefined;
		return currentRole;
	}
}

const userService = new UserService();
export default userService;
