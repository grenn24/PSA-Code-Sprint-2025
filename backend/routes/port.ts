import express from "express";
import portController from "../controllers/port";

const portRouter = express.Router();

// Define the route handlers
portRouter.get("", portController.getAllPorts);

export default portRouter;
