// services/OpenAIClient.ts
import { OpenAI } from "openai";
import config from "config";
export class OpenAIClient {
    client;
    MODEL = "gpt-4.1";
    TEMPERATURE = 0.7;
    constructor() {
        const apiKey = config.get("OPENAI_API_KEY");
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set in config");
        }
        this.client = new OpenAI({ apiKey });
    }
    async chat(message, systemPrompt, history = [], onDelta) {
        const stream = await this.client.responses.create({
            model: this.MODEL,
            input: [
                { role: "system", content: systemPrompt },
                ...history.map((m) => ({ role: m.role, content: m.content })),
                { role: "user", content: message },
            ],
            temperature: this.TEMPERATURE,
            stream: true,
        });
        let fullText = "";
        for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
                const chunk = event.delta;
                fullText += chunk;
                if (onDelta)
                    onDelta(chunk);
            }
        }
        return fullText;
    }
    async chatWithContext(message, systemPrompt, history = [], context, onDelta) {
        const userMessage = `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${message}`;
        const stream = await this.client.responses.create({
            model: this.MODEL,
            input: [
                { role: "system", content: systemPrompt },
                ...history.map((m) => ({ role: m.role, content: m.content })),
                { role: "user", content: userMessage },
            ],
            temperature: this.TEMPERATURE,
            stream: true,
        });
        let fullText = "";
        for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
                const chunk = event.delta;
                fullText += chunk;
                if (onDelta)
                    onDelta(chunk);
            }
        }
        return fullText;
    }
    async getEmbedding(text) {
        const response = await this.client.embeddings.create({
            model: "text-embedding-3-large",
            input: text,
        });
        return response.data[0].embedding;
    }
    async getTitle(firstMessage) {
        const response = await this.client.responses.create({
            model: this.MODEL,
            input: [
                {
                    role: "system",
                    content: "Generate a concise title for this conversation starter. Keep it under 6 words.",
                },
                { role: "user", content: firstMessage },
            ],
            temperature: this.TEMPERATURE,
        });
        return response.output_text;
    }
}
const openai = new OpenAIClient();
export default openai;
//# sourceMappingURL=openai.js.map