import { NextFunction, Request, Response } from "express";
declare class S3Controller {
    getUploadURL(request: Request, response: Response): Promise<void>;
    getDownloadURL(request: Request, response: Response): Promise<void>;
    getRemoveURL(request: Request, response: Response): Promise<void>;
    getPublicURL(request: Request, response: Response): Promise<void>;
    catchErrors(handler: any): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const s3Controller: S3Controller;
export default s3Controller;
