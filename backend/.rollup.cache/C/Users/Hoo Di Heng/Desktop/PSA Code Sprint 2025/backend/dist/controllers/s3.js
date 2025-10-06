import { HttpError } from "@common/types/http.js";
import mongoose from "mongoose";
import s3Service from "../utilities/s3.js";
class S3Controller {
    async getUploadURL(request, response) {
        const { s3Filename, folders } = request.body;
        response.status(200).send({
            url: await s3Service.generatePresignedUrl(s3Filename, folders, "PUT"),
        });
    }
    async getDownloadURL(request, response) {
        const { s3Filename, folders, contentDisposition } = request.body;
        response.status(200).send({
            url: await s3Service.generatePresignedUrl(s3Filename, folders, "GET", contentDisposition),
        });
    }
    async getRemoveURL(request, response) {
        const { s3Filename, folders } = request.body;
        response.status(200).send({
            url: await s3Service.generatePresignedUrl(s3Filename, folders, "DELETE"),
        });
    }
    async getPublicURL(request, response) {
        const { s3Filename, folders } = request.body;
        response.status(200).send({
            url: s3Service.getPublicUrl(s3Filename, folders),
        });
    }
    catchErrors(handler) {
        return async (request, response, next) => {
            try {
                await handler(request, response);
            }
            catch (err) {
                // Custom response errors
                if (err instanceof HttpError) {
                    // Custom response error
                    response.status(err.errorCode).send(err);
                    return;
                }
                else if (err instanceof mongoose.Error.DocumentNotFoundError ||
                    err instanceof mongoose.Error.ValidationError) {
                    response.status(400).send({ message: err.message });
                    return;
                }
                else {
                    // Internal Server Errors
                    next(err);
                }
            }
        };
    }
}
const s3Controller = new S3Controller();
export default s3Controller;
//# sourceMappingURL=s3.js.map