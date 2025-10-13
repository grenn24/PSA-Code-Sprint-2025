import { WBConversation, WBMessage } from "@common/types/wb";
declare class WBService {
    apiClient: import("utilities/apiClient").ApiClient;
    createConversation(data?: {
        content: string;
        timestamp: Date;
    }): Promise<WBConversation>;
    postMessage(conversationID: string, data: {
        content: string;
        timestamp: Date;
    }, userID: string): Promise<void>;
    postMessageStateless(data: {
        content: string;
        timestamp: Date;
    }, history: WBMessage[] | undefined, userID: string, systemPrompt?: string): Promise<void>;
    trackMoodChanges(userID: string, data?: {
        content: string;
        timestamp: Date;
    } | undefined, history?: WBMessage[]): Promise<void>;
    getUnbiasedOpinion(data: {
        content: string;
        timestamp: Date;
    }): Promise<void>;
    dailyCheckIn(data: {
        content: string;
        timestamp: Date;
    }): Promise<void>;
    getUsefulTips(userID: string): Promise<any>;
}
declare const wbService: WBService;
export default wbService;
