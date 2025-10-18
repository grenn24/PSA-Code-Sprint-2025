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
import { Course } from "../models/course.js";
import { Position } from "../models/position.js";
import Event from "../models/event.js";
import s3Service from "../utilities/s3.js";
import { predictLeadershipPotential as predictLeadership } from "../ml/predict-leadership.js";
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
        const sender = await User.findById(senderID).exec();
        if (!sender)
            throw new HttpError("Sendernot found", "NOT_FOUND", HttpStatusCode.NotFound);
        const mentor = await User.findById(mentorID).exec();
        if (!mentor)
            throw new HttpError("Mentor not found", "NOT_FOUND", HttpStatusCode.NotFound);
        mentor.mentorshipRequests = [
            ...mentor.mentorshipRequests.filter((r) => r.sender.toString() !== senderID),
            {
                sender: new mongoose.Types.ObjectId(senderID),
                message,
            },
        ];
        await mentor.save();
        await this.addNotification(mentorID, `${sender.name} sent you a mentorship request\n${message}`);
    }
    async addActivity(userID, activity) {
        const user = await User.findById(userID);
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        user.activities.push(activity);
        return await user.save();
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
        // Compute experience in years
        const menteeExperience = (new Date().getTime() - mentee.hireDate.getTime()) /
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
                    position: 1,
                    department: 1,
                    unit: 1,
                    languages: 1,
                    strengths: 1,
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
        const scoredMentors = candidates.map((mentor) => {
            const skill_alignment = this.countOverlappingSkills(mentee.skills, mentor.skills);
            const mentorExperience = (new Date().getTime() - new Date(mentor.hireDate).getTime()) /
                (1000 * 60 * 60 * 24 * 365);
            const experience_diff = mentorExperience - menteeExperience;
            const career_path_similarity = this.calculateCareerPathSimilarity(mentee.careerPath, mentor.careerPath);
            const score = w1 * skill_alignment +
                w2 * experience_diff +
                w3 * career_path_similarity;
            return { mentor, score };
        });
        return scoredMentors
            .sort((a, b) => b.score - a.score)
            .slice(page * (limit || scoredMentors.length), (limit || scoredMentors.length) * (page + 1))
            .map((m) => m.mentor);
    }
    // Skills overlap
    countOverlappingSkills(menteeSkills, mentorSkills) {
        const menteeSkillNames = new Set(menteeSkills.map((s) => s.name.toLowerCase()));
        return mentorSkills.filter((s) => menteeSkillNames.has(s.name.toLowerCase())).length;
    }
    // Career path similarity
    calculateCareerPathSimilarity(menteePath, mentorPath) {
        const menteePositions = new Set(menteePath.map((p) => p.name));
        const mentorPositions = new Set(mentorPath.map((p) => p.name));
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
    async getRecommendedCourses(userID) {
        const user = await User.findById(userID).exec();
        if (!user)
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        // Get current position
        const currentUserPosition = await this.getCurrentPosition(userID);
        let skillGaps = [];
        if (currentUserPosition) {
            skillGaps = currentUserPosition.skills
                .filter((posSkill) => {
                const userSkill = user.skills.find((us) => us.name === posSkill.name);
                return (!userSkill || (userSkill.level && userSkill.level < 100));
            })
                .map((posSkill) => ({
                ...posSkill,
                level: user.skills.find((us) => us.name === posSkill.name)
                    ?.level ?? 0,
            }));
        }
        return await getRecommendedCoursesHelper(skillGaps, user);
    }
    async getPotentialPositions(userID) {
        const user = await User.findById(userID).exec();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const currentPosition = await this.getCurrentPosition(userID);
        const currentSkills = [
            ...user.skills,
            ...(currentPosition?.skills || []),
        ];
        const potentialPositions = (await Position.find({
            _id: { $ne: currentPosition?._id },
            name: { $ne: currentPosition?.name },
        })
            .lean()
            .exec());
        const potentialRoles = [];
        for (const position of potentialPositions) {
            const totalSkills = position.skills.length;
            const matchedSkills = position.skills.filter((posSkill) => currentSkills.some((userSkill) => userSkill.name === posSkill.name &&
                (userSkill.level ?? 0) >= (posSkill?.level ?? 0)));
            const missingSkills = position.skills.filter((posSkill) => !currentSkills.some((userSkill) => userSkill.name === posSkill.name &&
                (userSkill.level ?? 0) >= (posSkill?.level ?? 0)));
            const relevance = Number((matchedSkills.length / totalSkills).toFixed(2));
            const recommendedCourses = await getRecommendedCoursesHelper(missingSkills, user);
            potentialRoles.push({
                position,
                missingSkills,
                recommendedCourses,
                relevance,
            });
        }
        // Sort by relevance (descending)
        potentialRoles.sort((a, b) => b.relevance - a.relevance);
        return potentialRoles;
    }
    async getCurrentPosition(userID) {
        const user = await User.findById(userID).lean().exec();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        return user.careerPath?.find((pos) => !pos.endDate);
    }
    getRecommendedEvents = async (userID) => {
        const user = await User.findById(userID)
            .populate("mentees mentors")
            .lean();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        // IDs of mentors and mentees to avoid duplicates
        const excludedUserIds = [
            ...(user.mentees?.map((m) => m._id) || []),
            ...(user.mentors?.map((m) => m._id) || []),
            user._id,
        ];
        // Get list of event IDs the user has already joined
        const joinedEventIds = await Event.find({
            participants: user._id,
        }).distinct("_id");
        const now = new Date();
        const events = await Event.find({
            _id: { $nin: joinedEventIds },
            endDate: { $gte: now },
        })
            .populate("creator", "name avatar")
            .populate("participants", "name avatar")
            .populate("comments.author", "name avatar")
            .lean();
        // Prioritize events where participants are mostly not in mentors/mentees
        const scoredEvents = (await events.map((event) => {
            const overlapCount = (event.participants || []).filter((p) => excludedUserIds.includes(p.toString())).length;
            if (event.coverImage) {
                event.coverImage.url = s3Service.getPublicUrl(event.coverImage.s3Filename, event.coverImage.folder);
            }
            return { event, score: -overlapCount };
        }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 6)
            .map((e) => e.event);
        return scoredEvents;
    };
    async predictLeadershipPotential(userID) {
        const user = await User.findById(userID).lean().exec();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const score = await predictLeadership(user);
        return score;
    }
    async submitLeadershipReview(userID, reviewerID, review) {
        const user = await User.findById(userID)
            .populate("supervisor")
            .populate("subordinates")
            .populate("mentors")
            .populate("mentees")
            .populate("mentorshipRequests.sender")
            .exec();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const reviewer = await User.findById(reviewerID).lean().exec();
        if (!reviewer) {
            throw new HttpError("Reviewer not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        user.leadershipReviews.push({
            reviewer: reviewer._id,
            ...review,
        });
        return await user.save();
    }
}
const userService = new UserService();
export default userService;
async function getRecommendedCoursesHelper(skillGaps, user) {
    const courses = await Course.find().exec();
    // Score each course and filter
    const scoredCourses = courses
        .map((course) => {
        let totalRelevance = 0;
        course.skillsTaught.forEach((cs) => {
            // Find all gaps that match this skill name
            const matchingGaps = skillGaps.filter((g) => g.name === cs.name);
            matchingGaps.forEach((gap) => {
                let relevance = 3; // base for skill name match
                // Function area match
                if (gap.functionArea === cs.functionArea)
                    relevance += 2;
                // Specialisation match
                if (gap.specialisation === cs.specialisation)
                    relevance += 1;
                // Aspirations match
                const inAspirations = user.aspirations.some((role) => role.skills.some((s) => s.name === cs.name));
                if (inAspirations)
                    relevance += 5;
                // Skill level gap
                if (gap.level)
                    relevance += Math.max(0, 100 - gap.level) / 50;
                totalRelevance += relevance;
            });
        });
        return { course, relevance: totalRelevance };
    })
        .filter((c) => c.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance)
        .map((c) => c.course);
    return scoredCourses.slice(0, 10);
}
//# sourceMappingURL=user.js.map