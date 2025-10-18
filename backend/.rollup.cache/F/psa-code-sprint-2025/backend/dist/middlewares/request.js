import mongoose from "mongoose";
import { HttpError } from "./error.js";
export const getID = (queryParams = ["ID"]) => (request, response, next) => {
    if (queryParams.length === 0) {
        next();
        return;
    }
    for (const queryParam of queryParams) {
        const id = request.params[queryParam];
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const err = new HttpError("Missing or invalid object id parameter", "INVALID_ID", 400);
            response.status(400).send(err);
            return;
        }
        if (queryParam === "ID") {
            response.locals._id = id;
        }
        else {
            response.locals[queryParam] = id;
        }
    }
    if (!response.locals._id) {
        response.locals._id = request.params[queryParams[0]];
    }
    next();
};
//# sourceMappingURL=request.js.map