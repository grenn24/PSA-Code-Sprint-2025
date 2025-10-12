import {
	pipeline,
	TextClassificationOutput,
} from "@huggingface/transformers";

const classifier = await pipeline(
	"sentiment-analysis",
	"Xenova/distilbert-base-uncased-finetuned-sst-2-english"
);

export async function getSentimentLevel(text: string) {
	const result = (await classifier(text)) as TextClassificationOutput;
	let level: number;
	const { label, score } = result?.[0];
	if (label === "POSITIVE") {
		level = 5 + score * 5;
	} else {
		level = 5 - score * 5;
	}
	return Number(level.toFixed(2));
}
