import mongoose from "mongoose";
import { Express } from "express";
declare const db: (app?: Express | undefined) => Promise<mongoose.Connection | undefined>;
export default db;
