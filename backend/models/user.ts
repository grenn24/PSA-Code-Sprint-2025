import { model, Schema } from "mongoose";
import { interestPositionSchema, positionSchema } from "./position.js";

const moodSchema = new Schema({
	level: { type: Number, min: 0, max: 10, required: true },
	date: { type: Date, required: true },
	notes: { type: [String], default: [] },
});

const activitySchema = new Schema({
	type: {
		type: String,
		enum: [
			"dailyCheckIn",
			"mindfulness",
			"mentorMessage",
			"mentorVideoCall",
		],
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

export const skillSchema = new Schema({
	name: { type: String, required: true },
	functionArea: { type: String, required: true },
	specialisation: { type: String, required: true },
	level: { type: Number, min: 0, max: 100 },
});

const educationSchema = new Schema({
	institution: { type: String, required: true },
	degree: { type: String, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
});

const projectSchema = new Schema({
	name: { type: String, required: true },
	role: { type: String, required: true },
	description: { type: String, required: true },
	outcomes: { type: [String], default: [] },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
});

const languageSchema = new Schema({
	name: { type: String, required: true },
	proficiency: {
		type: String,
		enum: ["Fluent", "Professional", "Conversational", "Intermediate"],
		required: true,
	},
});

const strengthSchema = new Schema({
	name: { type: String, required: true },
	level: {
		type: String,
		enum: ["Beginner", "Intermediate", "Advanced"],
		required: true,
	},
});

const leadershipReviewSchema = new Schema({
	reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
	ratings: {
		type: new Schema({
			communication: { type: Number, min: 0, max: 5, required: true },
			decisionMaking: { type: Number, min: 0, max: 5, required: true },
			strategicThinking: { type: Number, min: 0, max: 5, required: true },
			teamwork: { type: Number, min: 0, max: 5, required: true },
			adaptability: { type: Number, min: 0, max: 5, required: true },
		}),
		required: true,
	},
	comments: { type: String, default: "" },
	date: { type: Date, default: Date.now },
});

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		organisation: {
			type: String,
			default: "PSA Singapore",
		},
		position: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		unit: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		hireDate: { type: Date, required: true },
		password: { type: String, required: true },
		supervisor: { type: Schema.Types.ObjectId, ref: "User" },
		avatar: { type: String },
		bio: String,
		mentorshipRequests: {
			type: [
				{
					sender: {
						type: Schema.Types.ObjectId,
						ref: "User",
						required: true,
					},
					message: String,
				},
			],
			default: [],
		},
		mentees: {
			type: [{ type: Schema.Types.ObjectId, ref: "User" }],
			default: [],
		},
		notifications: {
			type: [
				{
					message: {
						type: String,
						required: true,
					},
					read: { type: Boolean, default: false },
					createdAt: { type: Date, default: Date.now },
				},
			],
			default: [],
		},
		careerPath: {
			type: [positionSchema],
			default: [],
		},
		skills: {
			type: [skillSchema],
			default: [],
		},
		moods: {
			type: [moodSchema],
			default: [],
		},
		activities: {
			type: [activitySchema],
			default: [],
		},
		languages: {
			type: [languageSchema],
			default: [],
		},
		strengths: {
			type: [strengthSchema],
			default: [],
		},
		education: {
			type: [educationSchema],
			default: [],
		},
		projects: {
			type: [projectSchema],
			default: [],
		},
		aspirations: {
			type: [positionSchema],
			default: [],
		},
		leadershipReviews: {
			type: [leadershipReviewSchema],
			default: [],
		},
		interestedPositions:{
			type:[interestPositionSchema],
			default:[]
		},
		lastSeen: { type: Date, default: null },
		isOnline: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

userSchema.virtual("subordinates", {
	ref: "User",
	localField: "_id",
	foreignField: "supervisor",
});
userSchema.virtual("mentors", {
	ref: "User",
	localField: "_id",
	foreignField: "mentees",
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = model("User", userSchema);

export default User;
