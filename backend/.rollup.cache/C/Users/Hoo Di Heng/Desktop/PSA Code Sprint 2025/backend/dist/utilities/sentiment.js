import { InferenceClient } from "@huggingface/inference";
import config from "config";
// Initialize with your Hugging Face API key
const hf = new InferenceClient(config.get("HF_API_KEY"));
export async function getSentimentLevel(text) {
    const result = await hf.textClassification({
        model: "nlptown/bert-base-multilingual-uncased-sentiment",
        inputs: text,
        provider: "hf-inference",
    });
    const sorted = result.sort((a, b) => {
        const aNum = parseInt(a.label);
        const bNum = parseInt(b.label);
        return aNum - bNum;
    });
    let score = 0;
    for (let i = 0; i < sorted.length; i++) {
        const star = parseInt(sorted[i].label);
        score += sorted[i].score * star;
    }
    return Number(((score / 5) * 10).toFixed(2));
}
//# sourceMappingURL=sentiment.js.map