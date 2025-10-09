import express from "express";
import wbController from "../controllers/wb.js";
import auth from "../middlewares/auth.js";
const wbRouter = express.Router();
wbRouter.use(auth("user"));
wbRouter.post("/", wbController.catchErrors(wbController.createConversation.bind(wbController)));
wbRouter.post("/useful-tips", wbController.catchErrors(wbController.getUsefulTips.bind(wbController)));
export default wbRouter;
//# sourceMappingURL=wb.js.map