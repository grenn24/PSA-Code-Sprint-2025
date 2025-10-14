import { model, Schema } from "mongoose";
import { s3FileSchema } from "./s3.js";
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    categories: {
        type: [String],
        default: [],
    },
    mode: {
        type: String,
        enum: ["online", "offline"],
        required: true,
    },
    location: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    coverImage: s3FileSchema,
    comments: {
        type: [
            {
                author: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
});
const Event = model("Event", eventSchema);
export default Event;
//# sourceMappingURL=event.js.map