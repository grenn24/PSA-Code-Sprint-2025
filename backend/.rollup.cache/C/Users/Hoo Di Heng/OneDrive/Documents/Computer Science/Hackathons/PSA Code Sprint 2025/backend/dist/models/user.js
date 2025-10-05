import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    position: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: { type: String, required: true },
    supervisor: { type: Schema.Types.ObjectId, ref: "User" },
    subordinates: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    experienceLevel: { type: Number, default: 0 },
    bio: String,
    skills: {
        type: [
            {
                name: { type: String },
                level: { type: Number, default: 0 },
            },
        ],
        default: [],
    },
    mentorshipRequests: {
        type: [
            {
                sender: { type: Schema.Types.ObjectId, ref: "User" },
                message: String,
            },
        ],
        default: [],
    },
    mentees: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    notifications: [
        {
            message: {
                type: String,
                required: true,
            },
            read: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    careerPath: [
        {
            position: {
                type: String,
                required: true,
            },
            progress: {
                type: Number,
                default: 0,
            },
            startedAt: {
                type: Date,
            },
            endedAt: {
                type: Date,
            },
            skillsRequired: {
                type: [String],
                default: [],
            },
        },
    ],
});
userSchema.virtual("mentors", {
    ref: "User",
    localField: "_id",
    foreignField: "mentees",
});
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map