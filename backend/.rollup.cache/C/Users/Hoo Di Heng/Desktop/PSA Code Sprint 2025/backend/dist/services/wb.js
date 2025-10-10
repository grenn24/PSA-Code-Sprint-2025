import { HttpStatusCode } from "@common/constants/statusCode.js";
import { HttpError } from "../middlewares/error.js";
import WBConversation from "../models/wb.js";
import openai from "../utilities/openai.js";
import User from "../models/user.js";
import dayjs from "dayjs";
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
    async postMessageStateless(data, history = [], onDelta, systemPrompt) {
        const response = await openai.chat(data.content, systemPrompt ?? this.DEFAULT_SYSTEM_PROMPT, history, onDelta);
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
			You may suggest seeking professional help if the user expresses suicidal ideation, self-harm intent arising from unpleasant moods like anxiety or depression.

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
    async getUnbiasedOpinion(data, onDelta) {
        const userMessage = `
			You are an impartial and thoughtful assistant. The user will ask a question or share a dilemma, and your task is to respond with an unbiased, balanced opinion.

			Provide a clear, reasoned response that considers multiple perspectives fairly. 
			- Do not take extreme sides unless there is strong factual or ethical justification.  
			- Avoid emotionally charged or judgmental language.  
			- If relevant, briefly outline the pros and cons of each viewpoint before summarizing your neutral stance.  
			- Maintain a calm, respectful, and rational tone throughout.

			Question:
			${data.content}`;
        const response = await openai.chat(userMessage, this.DEFAULT_SYSTEM_PROMPT, [], onDelta);
        return response;
    }
    async dailyCheckIn(data, onDelta) {
        const userMessage = `
		You are a thoughtful and impartial assistant. The user has shared their current mood or feelings. 
		Your task is to suggest a **single, relevant follow-up question** that encourages the user to reflect further on their mood or experience.

		Guidelines:
		- The question should be open-ended and supportive.
		- Avoid judgmental or leading questions.
		- Keep it empathetic, gentle, and neutral in tone.
		- The question should relate naturally to what the user just shared.

		User's Mood / Reflection:
		${data.content}

		Please respond **only with the follow-up question**, nothing else.
		`;
        const response = await openai.chat(userMessage, this.DEFAULT_SYSTEM_PROMPT, [], onDelta);
        return response;
    }
    async getUsefulTips(userID) {
        const user = await User.findById(userID).exec();
        if (!user) {
            throw new HttpError("User not found", "NOT_FOUND", HttpStatusCode.NotFound);
        }
        const userProfile = `
			Name: ${user.name}
			Position: ${user.position}
			Experience Level: ${user.experienceLevel}
			Bio: ${user.bio ?? "N/A"}
			Skills: ${user.skills
            .map((s) => `${s.name} (level ${s.level})`)
            .join(", ") || "N/A"}
			Career Path: ${user.careerPath
            .map((c) => `${c.position} (${c.progress}%)`)
            .join(", ") || "N/A"}
			Recent Mood Trends: ${user.moods.length > 0
            ? user.moods
                .slice(-10)
                .map((m) => `${new Date(m.date).toLocaleDateString()}: ${m.level} (${m.notes ?? "N/A"})`)
                .join("; ")
            : "No recent moods recorded"}
			`;
        const prompt = `
			You are a wellness assistant for PSA employees. 
			Based on the user's profile and current time ${dayjs().format("HH:mm")}, provide **10 friendly, practical, and relatable "Tip of the Moment"s"** that the user can apply in their daily work routine to improve wellness, focus, or mental health.

			- Each tip must be in JSON format: { "text": "...", "category": "...", "image": "..." }.
			- Category should be one of: "Physical", "Mental", "Focus", "Hydration", or "Ergonomics".
			- Image should be a realistic URL (can be placeholder images for now, e.g., from unsplash.com).
			- Keep the tone friendly, encouraging, and concise.
			- Avoid numeric mood levels; focus on actionable advice.

			User Info:
			${userProfile}

			Return only a JSON array of 15 tip objects.
			`;
        const response = await openai.chat(prompt, this.DEFAULT_SYSTEM_PROMPT, [], undefined);
        let jsonString = response
            .trim()
            .replace(/^```json\s*/, "")
            .replace(/^```\s*/, "")
            .replace(/```$/, "");
        let tips = [];
        try {
            tips = JSON.parse(jsonString);
        }
        catch (err) {
            console.error("Failed to parse tips from OpenAI:", err);
        }
        return tips;
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