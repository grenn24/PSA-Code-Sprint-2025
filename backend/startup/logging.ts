import winston, { format, transports } from "winston";

const { combine, timestamp, colorize, printf, json } = format;

const logging = () => {
	const logger = winston.createLogger({
		level: "info",
		format: combine(timestamp(), json()),
		transports: [
			new transports.Console({
				format: combine(
					colorize({ all: true }),
					printf(
						(info) =>
							`${info.timestamp} [${info.level}]: ${info.message}`
					)
				),
			}),
			new transports.File({ filename: "logs/app.log" }),
		],
		exceptionHandlers: [
			new transports.File({ filename: "logs/exceptions.log" }),
		],
		rejectionHandlers: [
			new transports.File({ filename: "logs/rejections.log" }),
		],
	});

	process.on("unhandledRejection", (reason, promise) => {
		if (reason instanceof Error) {
			logger.error("Unhandled Rejection:", {
				message: reason.message,
				stack: reason.stack,
				promise,
			});
		} else {
			logger.error("Unhandled Rejection:", {
				reason: JSON.stringify(reason),
				promise,
			});
		}
	});
};

export default logging;
