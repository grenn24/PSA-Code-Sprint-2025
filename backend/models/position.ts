import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema({
    name: { type: String, required: true },
    functionArea: { type: String, required: true },
    specialisation: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
});

export const positionSchema = new Schema({
    name: { type: String, required: true },
    focusAreas: { type: [String], default: [] },
    skills: { type: [skillSchema], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
});

export const Position = mongoose.model("Position", positionSchema);