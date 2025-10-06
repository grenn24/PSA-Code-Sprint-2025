export declare class OpenAIClient {
    private client;
    constructor();
    chat(message: string, systemPrompt?: string): Promise<string>;
    chatWithContext(message: string, systemPrompt: string | undefined, context: string[]): Promise<string>;
    getEmbedding(text: string): Promise<number[]>;
}
declare const openai: OpenAIClient;
export default openai;
