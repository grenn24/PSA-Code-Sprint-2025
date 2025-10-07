import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import WBConversation from "../models/wb.js";
import openai from "../utilities/openai.js";

class WBService {
	private SYSTEM_PROMPT = `
      You are a friendly and empathetic wellness assistant named Wellness Buddy 🤖.
      Your goal is to provide concise, positive advice on mental wellness, mindfulness, stress management,
      mood tracking, and general wellbeing. 
      Keep the tone encouraging, empathetic, and easy to understand.
    `;

	async postMessage(
		conversationId: string,
		data: {
			content: string;
			timestamp: Date;
		}
	) {
		const conversation = await WBConversation.findById(
			conversationId
		).exec();

		if (!conversation) {
			throw new HttpError(
				"Conversation not found",
				"NOT_FOUND",
				HttpStatusCode.NotFound
			);
		}
		const history = conversation?.messages;
		console.log(history);
		conversation.messages.push({
			role: "user",
			...data,
		});

		const response = await openai.chat(
			data.content,
			this.SYSTEM_PROMPT,
			history
		);
		conversation.messages.push({
			role: "assistant",
			content: response,
			timestamp: new Date(),
		});
		await conversation.save();

		return conversation;
	}

	async createConversation(
		userID: string,
		data?: {
			content: string;
			timestamp: Date;
		}
	) {
		const wbConversation = await WBConversation.create({
			user: userID,
			messages: [],
		});
		if (data) {
			const title = await openai.getTitle(data.content);
			wbConversation.title = title;
		}
		await wbConversation.save();
		console.log(wbConversation);
		return wbConversation;
	}
}

const wbService = new WBService();
export default wbService;
