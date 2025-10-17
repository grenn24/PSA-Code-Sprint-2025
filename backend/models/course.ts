import mongoose, { Schema, Document } from "mongoose";
import { skillSchema } from "./user.js";

const CourseSchema = new Schema(
	{
		name: { type: String, required: true },
		skillsTaught: { type: [skillSchema], required: true },
		durationHours: { type: Number, required: true },
		description: { type: String },
	},
	{ timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
