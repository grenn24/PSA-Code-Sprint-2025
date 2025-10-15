import express from "express";
import eventController from "../controllers/event.js";
import auth from "../middlewares/auth.js";
import { getID } from "../middlewares/request.js";
const eventRouter = express.Router();
eventRouter.use(auth("user"));
// Define the route handlers
eventRouter.get("", eventController.catchErrors(eventController.getAllEvents.bind(eventController)));
eventRouter.get("/:ID", getID(), eventController.catchErrors(eventController.getEventByID.bind(eventController)));
eventRouter.post("", eventController.catchErrors(eventController.createEvent.bind(eventController)));
eventRouter.put("/:ID", getID(), eventController.catchErrors(eventController.updateEvent.bind(eventController)));
eventRouter.post("/:ID/join", getID(), eventController.catchErrors(eventController.joinEvent.bind(eventController)));
eventRouter.post("/:ID/leave", getID(), eventController.catchErrors(eventController.leaveEvent.bind(eventController)));
export default eventRouter;
//# sourceMappingURL=event.js.map