import express from "express";
import chatController from "../controllers/chat.js";
import { getID } from "../middlewares/request.js";
import auth from "../middlewares/auth.js";
const chatRouter = express.Router();
// Define the route handlers
chatRouter.post("/:ID/message", getID(), chatController.catchErrors(chatController.postMessage.bind(chatController)));
chatRouter.put("/:chatID/message/:messageID", getID(["chatID", "messageID"]), auth("user"), chatController.catchErrors(chatController.updateMessage.bind(chatController)));
chatRouter.post("", chatController.catchErrors(chatController.createChat.bind(chatController)));
chatRouter.post("/:ID/read", getID(), auth("user"), chatController.catchErrors(chatController.markMessagesAsRead.bind(chatController)));
export default chatRouter;
