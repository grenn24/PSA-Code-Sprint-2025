// services/OpenAIClient.ts
import { OpenAI } from "openai";
import config from "config";
export class OpenAIClient {
    client;
    constructor() {
        const apiKey = config.get("OPENAI_API_KEY");
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set in config");
        }
        this.client = new OpenAI({ apiKey });
    }
    async chat(message, systemPrompt = "You are a friendly wellness assistant.") {
        const response = await this.client.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 250,
        });
        return response.choices[0].message?.content ?? "";
    }
    async chatWithContext(message, systemPrompt = "You are a friendly wellness assistant.", context) {
        const contextText = context.join("\n");
        const prompt = `${systemPrompt}\n\nContext:\n${contextText}\n\nUser: ${message}`;
        const response = await this.client.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 300,
        });
        return response.choices[0].message?.content ?? "";
    }
    async getEmbedding(text) {
        const response = await this.client.embeddings.create({
            model: "text-embedding-3-large",
            input: text,
        });
        return response.data[0].embedding;
    }
}
const openai = new OpenAIClient();
export default openai;
