import { Schema, model } from "mongoose";

const WBConversationSchema = new Schema(
	{
		title: { type: String, default: "" },
		user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
		messages: [
			{
				role: {
					type: String,
					enum: ["user", "assistant"],
					required: true,
				},
				content: { type: String, required: true },
				timestamp: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

const WBConversation = model("WBConversation", WBConversationSchema);

export default WBConversation;
