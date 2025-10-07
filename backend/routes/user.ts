import express from "express";
import userController from "../controllers/user.js";
import { getID } from "../middlewares/request.js";
import auth from "../middlewares/auth.js";

const userRouter = express.Router();

// Define the route handlers
userRouter.get(
	"",
	userController.catchErrors(userController.getAllUsers.bind(userController))
);

userRouter.get(
	"/:ID",
	getID(),
	userController.catchErrors(userController.getUserByID.bind(userController))
);

userRouter.get(
	"/:ID/wb",
	getID(),
	userController.catchErrors(userController.getWBConversations.bind(userController))
);

userRouter.get(
	"/:ID/top-matches",
	getID(),
	userController.catchErrors(
		userController.getTopMatchedMentors.bind(userController)
	)
);

userRouter.get(
	"/:ID/chats",
	getID(),
	userController.catchErrors(
		userController.getChats.bind(userController)
	)
);

userRouter.post(
	"",
	userController.catchErrors(userController.createUser.bind(userController))
);

userRouter.post(
	"/:ID/notifications",
	getID(),
	userController.catchErrors(
		userController.addNotification.bind(userController)
	)
);

userRouter.post(
	"/:ID/mentor-requests",
	getID(),
	auth("user"),
	userController.catchErrors(
		userController.sendMentorshipRequest.bind(userController)
	)
);

userRouter.put(
	"/:ID",
	getID(),
	userController.catchErrors(userController.updateUser.bind(userController))
);

userRouter.delete(
	"",
	userController.catchErrors(
		userController.deleteAllUsers.bind(userController)
	)
);

export default userRouter;
