import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    readAt: { type: Date },
});
const chatSchema = new Schema({
	participants: {
		type: [{ type: Schema.Types.ObjectId, ref: "User" }],
		required: true,
	},
    messages: {
        type: [messageSchema],
        default: [],
    },
	createdAt: { type: Date, default: Date.now },
});

const Chat = model("Chat", chatSchema);

export default Chat;
