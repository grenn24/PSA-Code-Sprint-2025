import mongoose from "mongoose";
import { HttpError } from "../middlewares/error.js";
import userService from "../services/user.js";
class UserController {
    async getAllUsers(request, response) {
        response.status(200).send(await userService.getAllUsers());
    }
    async createUser(request, response) {
        response.status(201).send(await userService.createUser(request.body));
    }
    async getUserByID(request, response) {
        const userID = response.locals._id;
        response.status(200).send(await userService.getUserByID(userID));
    }
    async updateUser(request, response) {
        const userID = response.locals._id;
        response
            .status(200)
            .send(await userService.updateUser(userID, request.body));
    }
    async addNotification(request, response) {
        const userID = response.locals._id;
        response
            .status(200)
            .send(await userService.addNotification(userID, request.body.message));
    }
    async sendMentorshipRequest(request, response) {
        const userID = response.locals.user?.id;
        const mentorID = response.locals._id;
        response
            .status(200)
            .send(await userService.sendMentorshipRequest(userID, mentorID, request.body.message));
    }
    async deleteAllUsers(request, response) {
        response.status(200).send(await userService.deleteAllUsers());
    }
    async getTopMatchedMentors(request, response) {
        const userID = response.locals._id;
        const limit = request.query.limit
            ? Number(request.query.limit)
            : undefined;
        const page = request.query.page
            ? Number(request.query.page)
            : undefined;
        response
            .status(200)
            .send(await userService.getTopMatchedMentors(userID, limit, page));
    }
    async getChats(request, response) {
        const userID = response.locals._id;
        response.status(200).send(await userService.getChats(userID));
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
const userController = new UserController();
export default userController;
//# sourceMappingURL=user.js.map