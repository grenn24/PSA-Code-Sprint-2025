import { NextFunction, Request, Response } from "express";
declare class UserController {
    getAllUsers(request: Request, response: Response): Promise<void>;
    createUser(request: Request, response: Response): Promise<void>;
    getUserByID(request: Request, response: Response): Promise<void>;
    updateUser(request: Request, response: Response): Promise<void>;
    addNotification(request: Request, response: Response): Promise<void>;
    sendMentorshipRequest(request: Request, response: Response): Promise<void>;
    deleteAllUsers(request: Request, response: Response): Promise<void>;
    getTopMatchedMentors(request: Request, response: Response): Promise<void>;
    catchErrors(handler: any): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const userController: UserController;
export default userController;
