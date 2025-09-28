"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError {
    constructor(message, status = undefined, errorCode = 400, data) {
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
        this.data = data;
    }
}
exports.HttpError = HttpError;
