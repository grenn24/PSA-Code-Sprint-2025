import express from "express";
import authController from "../controllers/auth.js";
const authRouter = express.Router();
// Define the route handlers
authRouter.post("/log-in", authController.catchErrors(authController.login.bind(authController)));
authRouter.post("/log-out", authController.catchErrors(authController.logout.bind(authController)));
export default authRouter;
