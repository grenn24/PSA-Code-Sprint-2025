import { InferenceClient } from "@huggingface/inference";
import config from "config";
const hf = new InferenceClient(config.get("HF_API_KEY"));
export async function getSentimentLevel(text) {
    const result = await hf.textClassification({
        model: "lxyuan/distilbert-base-multilingual-cased-sentiments-student",
        inputs: text,
        provider: "hf-inference",
    });
    const positiveScore = result.find((r) => r.label.toLowerCase() === "positive")?.score ?? 0;
    const negativeScore = result.find((r) => r.label.toLowerCase() === "negative")?.score ?? 0;
    const neutralScore = result.find((r) => r.label.toLowerCase() === "neutral")?.score ?? 0;
    const negativeMin = 1, neutralMin = 4, positiveMin = 7;
    const negativeMax = 4, neutralMax = 7, positiveMax = 10;
    const level = negativeScore *
        (negativeMin + (negativeMax - negativeMin) * negativeScore) +
        neutralScore * (neutralMin + (neutralMax - neutralMin) * neutralScore) +
        positiveScore *
            (positiveMin + (positiveMax - positiveMin) * positiveScore);
    const totalScore = negativeScore + neutralScore + positiveScore;
    const numericLevel = level / totalScore;
    return Number(numericLevel.toFixed(2));
}
//# sourceMappingURL=sentiment.js.map