import { NextFunction, Request, Response } from "express";
declare class WBController {
    postMessage(request: Request, response: Response): Promise<void>;
    createConversation(request: Request, response: Response): Promise<void>;
    catchErrors(handler: any): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const wbController: WBController;
export default wbController;
