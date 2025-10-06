import express from "express";
import wbController from "../controllers/wb.js";
import { getID } from "../middlewares/request.js";
import auth from "../middlewares/auth.js";
const wbRouter = express.Router();
wbRouter.post("/:ID", getID(), wbController.catchErrors(wbController.postMessage.bind(wbController)));
wbRouter.post("/", auth("user"), wbController.catchErrors(wbController.postMessage.bind(wbController)));
export default wbRouter;
//# sourceMappingURL=wb.js.map