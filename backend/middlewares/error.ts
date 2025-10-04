import createDebug from "debug";
import logger from "../utilities/winston.js";

// log uncaught errors to console

const runtimeDebug = createDebug("app:runtime");

export default function error(
	err: any,
	request: any,
	response: any,
	next: any
) {
	if (err) {
		runtimeDebug(err);
		logger("logs/errors.log").verbose(err);
		return response
			.status(500)
			.json({ status: "INTERNAL_SERVER_ERROR", message: err.message });
	} else {
		next();
	}
}

export class HttpError<T = any> {
	errorCode: number; // http status code
	status?: string;
	message: string;
	data?: T;

	constructor(
		message: string,
		status: string | undefined = undefined,
		errorCode: number | undefined = 400,
		data?: T
	) {
		this.message = message;
		this.status = status;
		this.errorCode = errorCode;
		this.data = data;
	}
}
