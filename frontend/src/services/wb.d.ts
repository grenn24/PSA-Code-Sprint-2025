import { WBConversation } from "@common/types/wb";
declare class WBService {
    apiClient: import("utilities/apiClient").ApiClient;
    createConversation(data?: {
        content: string;
        timestamp: Date;
    }): Promise<WBConversation>;
    postMessage(conversationID: string, data: {
        content: string;
        timestamp: Date;
    }): Promise<void>;
}
declare const wbService: WBService;
export default wbService;
