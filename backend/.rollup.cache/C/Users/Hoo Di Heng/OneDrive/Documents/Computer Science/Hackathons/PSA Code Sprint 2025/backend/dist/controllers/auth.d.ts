import { NextFunction, Request, Response } from "express";
declare class AuthController {
    login(request: any, response: any): Promise<void>;
    logout(request: Request, response: Response): Promise<void>;
    catchErrors(handler: any): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const authController: AuthController;
export default authController;
