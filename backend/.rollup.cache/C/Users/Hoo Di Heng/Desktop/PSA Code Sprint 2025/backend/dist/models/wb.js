import { Schema, model } from "mongoose";
const WBConversationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    messages: [
        {
            role: {
                type: String,
                enum: ["user", "wb"],
                required: true,
            },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
const WBConversation = model("WBConversation", WBConversationSchema);
export default WBConversation;
//# sourceMappingURL=wb.js.map