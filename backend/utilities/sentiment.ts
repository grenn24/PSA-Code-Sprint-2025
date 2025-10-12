import { InferenceClient } from "@huggingface/inference";
import config from "config";

// Initialize with your Hugging Face API key
const hf = new InferenceClient(config.get("HF_API_KEY"));

export async function getSentimentLevel(text: string) {
	const result = await hf.textClassification({
		model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
		inputs: text,
	});
	const { label, score } = result[0];

	let level: number;
	if (label === "POSITIVE") {
		level = 5 + score * 5; // 5-10
	} else {
		level = 5 - score * 5; // 1-5
	}

	return Number(level.toFixed(2));
}
