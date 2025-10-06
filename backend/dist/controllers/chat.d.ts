import { NextFunction, Request, Response } from "express";
declare class ChatController {
    postMessage(request: Request, response: Response): Promise<void>;
    updateMessage(request: Request, response: Response): Promise<void>;
    createChat(request: Request, response: Response): Promise<void>;
    markMessagesAsRead(request: Request, response: Response): Promise<void>;
    catchErrors(handler: any): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const chatController: ChatController;
export default chatController;
