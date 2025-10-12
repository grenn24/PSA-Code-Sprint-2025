import { OpenAI } from "openai";
import config from "config";
import pineconeClient from "./pinecone.js";
export class OpenAIClient {
    client;
    MODEL = "gpt-4.1";
    EMBEDDING_MODEL = "text-embedding-3-large";
    TEMPERATURE = 0.7;
    constructor() {
        const apiKey = config.get("OPENAI_API_KEY");
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set in config");
        }
        this.client = new OpenAI({ apiKey });
    }
    async chat(message, systemPrompt, history = [], onDelta) {
        const inputEmbedding = await this.getEmbedding(message);
        const semanticSearchResults = await pineconeClient.query(inputEmbedding);
        const promptContext = semanticSearchResults
            .map((m) => m.metadata?.text ?? "")
            .join("\n---\n");
        const stream = await this.client.responses.create({
            model: this.MODEL,
            input: [
                {
                    role: "system",
                    content: `${systemPrompt}\n\nRelevant context:\n${promptContext}`,
                },
                ...history.map((m) => ({ role: m.role, content: m.content })),
                { role: "user", content: message },
            ],
            temperature: this.TEMPERATURE,
            stream: true,
        });
        let fullResponseText = "";
        for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
                const chunk = event.delta;
                fullResponseText += chunk;
                onDelta?.(chunk);
            }
        }
        return fullResponseText;
    }
    async getEmbedding(text) {
        const response = await this.client.embeddings.create({
            model: this.EMBEDDING_MODEL,
            input: text,
        });
        return response.data[0].embedding;
    }
    async getEmbeddings(texts) {
        const response = await this.client.embeddings.create({
            model: this.EMBEDDING_MODEL,
            input: texts,
        });
        return response.data.map((d) => d.embedding);
    }
    async getTitle(firstMessage) {
        const response = await this.client.responses.create({
            model: this.MODEL,
            input: [
                {
                    role: "system",
                    content: `
						Generate a concise title for this conversation starter.
						Keep it under 6 words.
						Do NOT include any prefixes like "Title:" or extra punctuation.
						Return only the title itself.
						`,
                },
                { role: "user", content: firstMessage },
            ],
            temperature: this.TEMPERATURE,
            max_output_tokens: 16,
        });
        return response.output_text;
    }
}
const openai = new OpenAIClient();
export default openai;
//# sourceMappingURL=openai.js.map