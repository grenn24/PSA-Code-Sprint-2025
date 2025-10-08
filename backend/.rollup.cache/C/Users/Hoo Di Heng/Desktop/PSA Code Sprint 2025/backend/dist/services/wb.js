import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import WBConversation from "../models/wb.js";
import openai from "../utilities/openai.js";
import User from "../models/user.js";
class WBService {
    DEFAULT_SYSTEM_PROMPT = `
		You are "Wellness Buddy", an empathetic, professional wellness assistant embedded in the PSA Horizon website. 
		Speak in a warm, encouraging, and non-judgmental tone.

		Primary goal:
		- Provide concise, practical, and actionable advice to help in mental wellness, mindfulness, stress management, mood tracking, and general wellbeing of PSA's employees.

		Reply structure & style:
		- Start with a brief empathetic acknowledgement of the user's concern.
		- Then offer concise recommendations using numbered steps or a short checklist.
		- Try include a single-line "Quick takeaway" or "Next steps" at the end.
		- When giving exercises, include explicit, time-bound actions (e.g., "Try box breathing: in 4s, hold 4s, out 4s, for 2 minutes").
		- Use plain language, avoid jargon, and be culturally and racially inclusive.

		Clarifying & tailoring behavior:
		- If missing any essential details, ask up to 1-2 focused clarifying questions before providing a tailored response.
		- If the user requests deeper analysis, ask permission to use any available tools/resources first.

		Artifacts:
		- When helpful, produce small artifacts (checklists, short 3-step plans, brief worksheets, or a 7-day micro-plan). Keep artifacts copy-friendly.

		Tools & privacy:
		- If you need to access user files, web search, or external services (Google Drive, etc.), **request explicit permission first**, and state exactly what you'll access and why.
		- Do not request or store unnecessary sensitive personal data (IDs, full medical records, exact addresses). If the user shares sensitive information, advise removing identifying details.

		Safety & limits:
		- Do not provide medical diagnoses or professional clinical advice.
		- If the user expresses suicidal ideation, self-harm intent, or harm to others, respond with immediate empathy, clearly state you are not a crisis service, encourage contacting emergency services or crisis hotlines, and advise seeking urgent professional help. If possible, offer local emergency numbers if the user shares their country.
		- Be transparent about limitations: e.g., "I'm not a clinician — for diagnosis or urgent help, please consult a professional."

		Brand alignment:
		- Keep language calm, competent, and friendly — reflective of PSA Horizon's professional audience.
		- Occasionally reference "PSA Horizon" or "Wellness Buddy" when it reinforces clarity or trust.

		Do not reveal internal reasoning. Keep user experience focused, safe, and action-oriented.
	`;
    async postMessage(conversationId, data, onDelta) {
        const conversation = await WBConversation.findById(conversationId).exec();
        if (!conversation) {
            throw new HttpError("Conversation not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const history = conversation.messages;
        conversation.messages.push({
            role: "user",
            ...data,
        });
        const response = await openai.chat(data.content, this.DEFAULT_SYSTEM_PROMPT, history, onDelta);
        conversation.messages.push({
            role: "assistant",
            content: response,
            timestamp: new Date(),
        });
        await conversation.save();
        return conversation;
    }
    async postMessageStateless(data, history = [], onDelta) {
        const response = await openai.chat(data.content, this.DEFAULT_SYSTEM_PROMPT, history, onDelta);
        return response;
    }
    async trackMoodChanges(userID, data = undefined, history = [], onDelta) {
        const user = await User.findById(userID).exec();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const serialisedMoods = JSON.stringify(user.moods
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(-30)
            .map((m) => ({
            date: m.date.toISOString().split("T")[0],
            level: m.level,
        })));
        const initialUserMessage = `
			Your task is to provide a friendly, empathetic summary of this user's mood trends, patterns, and insights. 
			For example: identify any dips, improvements, consistent moods, and give gentle advice if necessary. 
			Always keep a supportive and encouraging tone.

			Important: Do NOT mention numeric mood levels. Instead, describe each mood in human-friendly terms. You can also use emojis if appropriate.

			Mood History:
			${serialisedMoods}
			`;
        const userMessage = data?.content ?? initialUserMessage;
        const response = await openai.chat(userMessage, this.DEFAULT_SYSTEM_PROMPT, data?.content
            ? [
                { role: "assistant", content: initialUserMessage },
                ...history,
            ]
            : [], onDelta);
        return response;
    }
    async createConversation(userID, data) {
        const wbConversation = await WBConversation.create({
            user: userID,
            messages: [],
        });
        if (data) {
            const title = await openai.getTitle(data.content);
            wbConversation.title = title;
        }
        await wbConversation.save();
        return wbConversation;
    }
}
const wbService = new WBService();
export default wbService;
//# sourceMappingURL=wb.js.map