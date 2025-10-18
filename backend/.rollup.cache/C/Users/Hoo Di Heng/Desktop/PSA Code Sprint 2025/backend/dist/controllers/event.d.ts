import { NextFunction, Request, Response } from "express";
declare class EventController {
    getAllEvents(request: Request, response: Response): Promise<void>;
    getEventByID(request: Request, response: Response): Promise<void>;
    createEvent(request: Request, response: Response): Promise<void>;
    updateEvent(request: Request, response: Response): Promise<void>;
    joinEvent(request: Request, response: Response): Promise<void>;
    leaveEvent(request: Request, response: Response): Promise<void>;
    deleteEventByID(request: Request, response: Response): Promise<void>;
    catchErrors(handler: any): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const eventController: EventController;
export default eventController;
