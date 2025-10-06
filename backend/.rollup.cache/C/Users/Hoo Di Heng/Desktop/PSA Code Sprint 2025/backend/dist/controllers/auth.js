import authService from "../services/auth.js";
import { HttpError } from "../middlewares/error.js";
import mongoose from "mongoose";
class AuthController {
    async login(request, response) {
        const { email, password } = request.body;
        const { token, user } = await authService.login(email, password);
        response
            .cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
            .status(200)
            .send({
            token, user
        });
    }
    async logout(request, response) {
        response
            .cookie("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        })
            .status(200)
            .send({ message: "Logged out successfully" });
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
const authController = new AuthController();
export default authController;
//# sourceMappingURL=auth.js.map