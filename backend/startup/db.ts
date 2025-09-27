import mongoose from "mongoose";
import config from "config";
import createDebug from "debug";
import {Express} from "express";

const dbDebug = createDebug("db");

const db = (app:Express) =>
	mongoose
		.connect(config.get("DATABASE_URL"))
		.then((conn) => {dbDebug(`Connected to Database`);
			app.locals.db = conn.connection;
		})
		.catch((err) => dbDebug(err));

export default db;
