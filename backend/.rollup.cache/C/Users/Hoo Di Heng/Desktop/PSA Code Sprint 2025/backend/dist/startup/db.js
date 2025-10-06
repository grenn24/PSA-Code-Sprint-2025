import mongoose from "mongoose";
import config from "config";
import createDebug from "debug";
import logger from "../utilities/winston.js";
const dbDebug = createDebug("db");
const dbStartupDebug = createDebug("db:startup");
// Establish connection with mongodb, resolves with a mongoose instance
const db = async (app = undefined) => {
    try {
        const conn = await mongoose.connect(config.get("DATABASE_URL"));
        dbStartupDebug(`Database is connected at ${config.get("DATABASE_URL")}`);
        if (app) {
            app.locals.db = conn.connection;
        }
        return conn.connection;
    }
    catch (err) {
        console.log(err);
        dbDebug(err);
        logger("/logs/db.log").verbose(err);
    }
};
export default db;
//# sourceMappingURL=db.js.map