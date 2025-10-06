import express from "express";
import morgan from "morgan";
import cors from "../middlewares/cors.js";
import cookieParser from "cookie-parser";
const middlewares = (app) => {
    // middlewares
    app.use(cors);
    app.use(cookieParser());
    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ limit: "5mb", extended: true }));
    if (app.get("env") === "development") {
        app.use(morgan("tiny"));
    }
};
export default middlewares;
//# sourceMappingURL=middlewares.js.map