import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import WBConversation from "../models/wb.js";
import openai from "../utilities/openai.js";
class WBService {
    async postMessage(conversationId, userMessage) {
        const conversation = await WBConversation.findById(conversationId);
        if (!conversation) {
            throw new HttpError("Conversation not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        conversation.messages.push({
            role: "user",
            text: userMessage,
            timestamp: new Date(),
        });
        const systemPrompt = `
      You are a friendly and empathetic wellness assistant named Wellness Buddy 🤖.
      Your goal is to provide concise, positive advice on mental wellness, mindfulness, stress management,
      mood tracking, and general wellbeing. 
      Keep the tone encouraging, empathetic, and easy to understand.
    `;
        const response = await openai.chat(userMessage, systemPrompt);
        conversation.messages.push({
            role: "wb",
            text: response,
            timestamp: new Date(),
        });
        await conversation.save();
        return response;
    }
    async createConversation(userID, userMessage) {
        const systemPrompt = `
      You are a friendly and empathetic wellness assistant named Wellness Buddy 🤖.
      Your goal is to provide concise, positive advice on mental wellness, mindfulness, stress management,
      mood tracking, and general wellbeing. 
      Keep the tone encouraging, empathetic, and easy to understand.
    `;
        const wbConversation = await WBConversation.create({
            user: userID,
            messages: [{ role: "user", text: userMessage }],
        });
        const response = await openai.chat(userMessage, systemPrompt);
        wbConversation.messages.push({
            role: "wb",
            text: response,
            timestamp: new Date(),
        });
        await wbConversation.save();
        return wbConversation;
    }
}
const wbService = new WBService();
export default wbService;
