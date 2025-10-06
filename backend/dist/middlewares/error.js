import createDebug from "debug";
import logger from "../utilities/winston.js";
// log uncaught errors to console
const runtimeDebug = createDebug("app:runtime");
export default function error(err, request, response, next) {
    if (err) {
        runtimeDebug(err);
        logger("logs/errors.log").verbose(err);
        return response
            .status(500)
            .json({ status: "INTERNAL_SERVER_ERROR", message: err.message });
    }
    else {
        next();
    }
}
export class HttpError {
    errorCode; // http status code
    status;
    message;
    data;
    constructor(message, status = undefined, errorCode = 400, data) {
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
        this.data = data;
    }
}
