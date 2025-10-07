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

export interface WebsocketMessage<T = any> {
	type: string;
	data?: T;
	status?: string;
	timestamp: string;
	[key: string]: any;
}
