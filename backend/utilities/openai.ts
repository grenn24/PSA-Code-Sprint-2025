// services/OpenAIClient.ts
import { OpenAI } from "openai";
import config from "config";

export class OpenAIClient {
	private client: OpenAI;
	private MODEL = "gpt-4.1";
	private TEMPERATURE = 0.7;

	constructor() {
		const apiKey = config.get<string>("OPENAI_API_KEY");
		if (!apiKey) {
			throw new Error("OPENAI_API_KEY is not set in config");
		}

		this.client = new OpenAI({ apiKey });
	}

	async chat(
		message: string,
		systemPrompt: string,
		history: { role: "user" | "assistant"; content: string }[] = []
	) {
		const response = await this.client.responses.create({
			model: this.MODEL,
			input: [
				{ role: "system", content: systemPrompt },
				...history.map((m) => ({ role: m.role, content: m.content })),
				{ role: "user", content: message },
			],
			temperature: this.TEMPERATURE,
		});

		return response.output_text;
	}

	async chatWithContext(
		message: string,
		systemPrompt: string,
		history: { role: "user" | "assistant"; content: string }[] = [],
		context: string
	) {
		const userMessage = `${systemPrompt}\n\nContext:\n${context}\n\nUser: ${message}`;
		const response = await this.client.responses.create({
			model: this.MODEL,
			input: [
				{ role: "system", content: systemPrompt },
				...history.map((m) => ({ role: m.role, content: m.content })),
				{ role: "user", content: userMessage },
			],
			temperature: this.TEMPERATURE,
		});

		return response.output_text;
	}

	async getEmbedding(text: string) {
		const response = await this.client.embeddings.create({
			model: "text-embedding-3-large",
			input: text,
		});

		return response.data[0].embedding;
	}

	async getTitle(firstMessage: string) {
		const response = await this.client.responses.create({
			model: this.MODEL,
			input: [
				{
					role: "system",
					content:
						"Generate a concise title for this conversation starter. Keep it under 6 words.",
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
