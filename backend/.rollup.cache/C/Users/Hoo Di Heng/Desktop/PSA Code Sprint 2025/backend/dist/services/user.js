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
dayjs.extend(utc);
dayjs.extend(timezone);
class UserService {
    // Get all users
    async getAllUsers() {
        return await User.find().populate("mentors").exec();
    }
    // Create a new user
    async createUser(userData) {
        const { name, email, password, role, position, supervisor, subordinates, avatar, experienceLevel, } = userData;
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
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        return user;
    }
    async updateUser(userId, userData) {
        const user = await User.findById(userId);
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
            new: true,
        });
        return updatedUser;
    }
    async addNotification(userId, message) {
        // Add to DB
        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                notifications: {
                    message,
                    read: false,
                    createdAt: new Date(),
                },
            },
        }, { new: true });
        if (!user)
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        const notifications = user.notifications;
        websocketService.sendTo(userId, {
            type: "NEW_NOTIFICATION",
            data: notifications.pop(),
            timestamp: new Date().toISOString(),
        });
        return user;
    }
    async sendMentorshipRequest(senderID, mentorID, message) {
        const sender = await User.findById(senderID);
        if (!sender)
            throw new HttpError("Sendernot found", "NOT_FOUND", HttpStatusCode.NotFound);
        const mentor = await User.findById(mentorID);
        if (!mentor)
            throw new HttpError("Mentor not found", "NOT_FOUND", HttpStatusCode.NotFound);
        mentor.mentorshipRequests.push({
            sender: senderID,
            message,
        });
        await mentor.save();
        await this.addNotification(mentorID, `${sender.name} sent you a mentorship request\n${message}`);
    }
    async getChats(userID) {
        const user = await User.findById(userID);
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
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
    async getNotifications(userID) {
        const user = await User.findById(userID);
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        return user.notifications;
    }
    async getWBConversations(userID) {
        const conversations = await WBConversation.find({
            user: userID,
        }).exec();
        return conversations;
    }
    async getTopMatchedMentors(userId, limit, page = 0) {
        const mentee = await User.findById(userId).populate("mentors").exec();
        if (!mentee)
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        const excludedMentorIds = mentee.mentors.map((m) => new mongoose.Types.ObjectId(m._id));
        const candidates = await User.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose.Types.ObjectId(userId),
                        $nin: excludedMentorIds,
                    },
                    experienceLevel: { $gte: mentee.experienceLevel },
                    "mentorshipRequests.sender": {
                        $ne: new mongoose.Types.ObjectId(userId),
                    },
                },
            },
            {
                $project: {
                    skills: 1,
                    experienceLevel: 1,
                    careerPath: 1,
                    name: 1,
                    experience_diff: {
                        $subtract: ["$experienceLevel", mentee.experienceLevel],
                    },
                    avatar: 1,
                },
            },
            { $limit: 200 },
        ]);
        const w1 = 0.4;
        const w2 = 0.2;
        const w3 = 0.3;
        const scoredMentors = candidates.map((mentor) => {
            const skill_alignment = this.countOverlappingSkills(mentee.skills, mentor.skills);
            const experience_diff = mentor.experienceLevel - mentee.experienceLevel;
            const career_path_similarity = this.calculateCareerPathSimilarity(mentee.careerPath, mentor.careerPath);
            const score = w1 * skill_alignment +
                w2 * experience_diff +
                w3 * career_path_similarity;
            return {
                mentor,
                score,
            };
        });
        return scoredMentors
            .sort((a, b) => b.score - a.score)
            .slice(page * (limit || scoredMentors.length), (limit || scoredMentors.length) * (page + 1))
            .map((m) => m.mentor);
    }
    countOverlappingSkills(mentorSkills, menteeSkills) {
        const overlap = mentorSkills.filter((s) => menteeSkills.includes(s.name.toLowerCase())).length;
        return overlap;
    }
    calculateCareerPathSimilarity(menteePath, mentorPath) {
        const menteePositions = new Set(menteePath.map((p) => p.position));
        const mentorPositions = new Set(mentorPath.map((p) => p.position));
        const intersection = [...menteePositions].filter((p) => mentorPositions.has(p));
        const union = new Set([...menteePositions, ...mentorPositions]);
        return union.size > 0 ? intersection.length / union.size : 0;
    }
    async deleteAllUsers() {
        return await User.deleteMany({}).exec();
    }
    async updateTodayMood(userId, level, notes = []) {
        const todayStart = dayjs().tz("Asia/Singapore").startOf("day");
        const user = await User.findById(userId);
        if (!user)
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        user.moods.push({ date: todayStart, level, notes });
        await user.save();
        return user.moods[user.moods.length - 1];
    }
}
const userService = new UserService();
export default userService;
//# sourceMappingURL=user.js.map