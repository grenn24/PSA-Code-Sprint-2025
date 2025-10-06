import winston, { transports, format } from "winston";
const { combine, timestamp, colorize, prettyPrint, simple, json } = format;
const { Console, File } = transports;
// log errors to a file or console
const logger = (filename) => winston.createLogger({
    level: "info", // Set the log level (silly, debug, verbose, info, warn, error)
    format: combine(colorize({ all: true }), timestamp(), json()),
    transports: [
        //new Console({format: winston.format.combine(winston.format.colorize(),winston.format.prettyPrint()),}),
        new File({ filename: filename }),
    ],
});
export default logger;
//# sourceMappingURL=winston.js.map