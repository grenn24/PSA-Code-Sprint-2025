export declare class OpenAIClient {
    private client;
    private MODEL;
    private TEMPERATURE;
    constructor();
    chat(message: string, systemPrompt: string, history: {
        role: "user" | "assistant";
        content: string;
    }[] | undefined, onDelta: (message: string) => void): Promise<string>;
    chatWithContext(message: string, systemPrompt: string, history: {
        role: "user" | "assistant";
        content: string;
    }[] | undefined, context: string, onDelta: (message: string) => void): Promise<string>;
    getEmbedding(text: string): Promise<number[]>;
    getTitle(firstMessage: string): Promise<string>;
}
declare const openai: OpenAIClient;
export default openai;
