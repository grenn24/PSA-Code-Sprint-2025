import { HttpStatusCode } from "@common/constants/statusCode";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import store from "../redux/store";
import { enqueueMessage, setForbidden } from "../redux/slices/error";

export class ApiClient {
	private client: AxiosInstance;
	private baseUrlClient: AxiosInstance;

	constructor(
		baseURL: string,
		requestConfigInterceptor?: (config: AxiosRequestConfig) => void,
		responseErrorInterceptor?: (status: number, body: object) => void
	) {
		const client = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json", // dont include x-access-token as default headers (since it will change frequently)
				Accept: "application/json",
			},
		});
		client.interceptors.request.use(
			(config) => {
				// Do something before request is sent
				requestConfigInterceptor?.(config);
				return config;
			},
			(err) => {
				// An error occurred while setting up the request
				console.error(
					"An error occurred while setting up the request:" +
						err.message
				);
				return Promise.reject(err);
			}
		);
		client.interceptors.response.use(
			// http status code within 2xx
			(response) => {
				return { body: response.data, ...response };
			},
			// http status code outside 2xx
			(err) => {
				// Error response received
				if (err.response) {
					const status = err.response?.status;
					const body = err.response?.data;
					if (status === HttpStatusCode.Forbidden) {
						store.dispatch(setForbidden(true));
					} else if (
						status === HttpStatusCode.BadRequest &&
						body?.status === "INVALID_ID"
					) {
						window.location.href = "/";
					}
					responseErrorInterceptor?.(
						err.response.status,
						err.response.data
					);
					if (status !== 404 && status !== 403 && status !== 401) {
						console.error("API request error:", {
							status,
							body,
						});
					}
				} else if (err.name === "CancelledError") {
					// Request aborted using AbortController signal
					// console.error("Request was aborted");
					// return undefined data for aborted requests
					return { body: undefined, data: undefined };
				} else if (err.request) {
					// Request was made but no response was received
					console.error("No response from server:" + err.request);
				} else {
					// An error occurred while handling the response
					console.error(
						"An error occurred while handling the response:" +
							err.message
					);
				}
				return Promise.reject({
					body: err.response?.data,
					status: err.response?.status,
				});
			}
		);
		this.client = client;
		this.baseUrlClient = axios.create({
			baseURL: import.meta.env.VITE_BACKEND_BASEURL,
		});
	}

	// GET request
	public async get<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		try {
			const response = await this.client.get<T>(url, {
				withCredentials: true,
				...config,
				headers: {
					...config?.headers,
					"X-Access-Token": sessionStorage.getItem("X-Access-Token"),
				},
			});
			return response;
		} catch (err) {
			// Missing or invalid access token (401 Unauthorised)
			if (err.status === HttpStatusCode.Unauthorized && err.body?.status === "INVALID_ACCESS_TOKEN") {
				store.dispatch(
					enqueueMessage({
						content: "Session expired, please log in again.",
						type: "warning",
						variant: "snackbar",
					})
				);
				const queryParams = window.location.search;
				window.location.href = `/log-in${queryParams}`;
			}
			throw err;
		}
	}

	// POST request
	public async post<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		try {
			const response = await this.client.post<T, AxiosResponse<R>>(
				url,
				data,
				{
					withCredentials: true,
					...config,
					headers: {
						...config?.headers,
						"X-Access-Token":
							sessionStorage.getItem("X-Access-Token"),
					},
				}
			);
			return response;
		} catch (err) {
			// Missing or invalid access token (401 Unauthorised)
			if (err.status === HttpStatusCode.Unauthorized && err.body?.status === "INVALID_ACCESS_TOKEN") {
				store.dispatch(
					enqueueMessage({
						content: "Session expired, please log in again.",
						type: "warning",
						variant: "snackbar",
					})
				);
				const queryParams = window.location.search;
				window.location.href = `/log-in${queryParams}`;
			}
			throw err;
		}
	}

	// PUT request
	public async put<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		try {
			const response = await this.client.put<T, AxiosResponse<R>>(
				url,
				data,
				{
					withCredentials: true,
					...config,
					headers: {
						...config?.headers,
						"X-Access-Token":
							sessionStorage.getItem("X-Access-Token"),
					},
				}
			);
			return response;
		} catch (err) {
			// Missing or invalid access token (401 Unauthorised)
			if (err.status === HttpStatusCode.Unauthorized && err.body?.status === "INVALID_ACCESS_TOKEN") {
				store.dispatch(
					enqueueMessage({
						content: "Session expired, please log in again.",
						type: "warning",
						variant: "snackbar",
					})
				);
				const queryParams = window.location.search;
				window.location.href = `/log-in${queryParams}`;
			}
			throw err;
		}
	}

	// PATCH request
	public async patch<T, R>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<R>> {
		try {
			const response = await this.client.patch<T, AxiosResponse<R>>(
				url,
				data,
				{
					withCredentials: true,
					...config,
					headers: {
						...config?.headers,
						"X-Access-Token":
							sessionStorage.getItem("X-Access-Token"),
					},
				}
			);
			return response;
		} catch (err) {
			// Missing or invalid access token (401 Unauthorised)
			if (err.status === HttpStatusCode.Unauthorized && err.body?.status === "INVALID_ACCESS_TOKEN") {
				store.dispatch(
					enqueueMessage({
						content: "Session expired, please log in again.",
						type: "warning",
						variant: "snackbar",
					})
				);
				const queryParams = window.location.search;
				window.location.href = `/log-in${queryParams}`;
			}
			throw err;
		}
	}

	// DELETE request
	public async delete<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		try {
			const response = await this.client.delete<T>(url, {
				withCredentials: true,
				...config,
				headers: {
					...config?.headers,
					"X-Access-Token": sessionStorage.getItem("X-Access-Token"),
				},
			});
			return response;
		} catch (err) {
			// Missing or invalid access token (401 Unauthorised)
			if (err.status === HttpStatusCode.Unauthorized && err.body?.status === "INVALID_ACCESS_TOKEN") {
				store.dispatch(
					enqueueMessage({
						content: "Session expired, please log in again.",
						type: "warning",
						variant: "snackbar",
					})
				);
				const queryParams = window.location.search;
				window.location.href = `/log-in${queryParams}`;
			}
			throw err;
		}
	}
}

const createApiClient = (
	parentPath: string,
	requestConfigInterceptor: (config: AxiosRequestConfig) => void = () => {},
	responseErrorInterceptor: (status: number, body: object) => void = () => {}
) =>
	new ApiClient(
		import.meta.env.VITE_BACKEND_BASEURL + parentPath,
		requestConfigInterceptor,
		responseErrorInterceptor
	);
export default createApiClient;

// only for api client requests
export const handleApiRequest = async <T>(
	request: Promise<AxiosResponse<T>>,
	errorHandler?: (status: number, body) => void,
	shouldShowErrorSnackbar:
		| boolean
		| ((status: number, body) => boolean) = true
): Promise<{
	isSuccess: boolean;
	data?: T;
	body?: T;
	status?: number;
}> => {
	try {
		const res = await request;
		return {
			isSuccess: true,
			data: res.data,
			body: res.data,
			status: res.status,
		};
	} catch (err) {
		console.error(err);
		errorHandler?.(err?.status, err?.body);

		// Call function when needed
		const showErrorSnackbar =
			typeof shouldShowErrorSnackbar === "function"
				? shouldShowErrorSnackbar(err?.status, err?.body)
				: shouldShowErrorSnackbar;

		// If error has no status then skip
		if (showErrorSnackbar && err?.status) {
			switch (err?.status) {
				case HttpStatusCode.BadRequest:
					store.dispatch(
						enqueueMessage({
							content:
								"Oops! Something looks off with your request.",
							type: "error",
							variant: "snackbar",
							key: uuidv4(),
						})
					);
					break;
				case HttpStatusCode.Unauthorized:
					store.dispatch(
						enqueueMessage({
							content: "You are not authorised.",
							type: "error",
							variant: "snackbar",
							key: uuidv4(),
						})
					);
					break;
				case HttpStatusCode.Forbidden:
					store.dispatch(
						enqueueMessage({
							content: "You do not have permission.",
							type: "error",
							variant: "snackbar",
							key: uuidv4(),
						})
					);
					break;
				case HttpStatusCode.InternalServerError:
					store.dispatch(
						enqueueMessage({
							content:
								"Internal server error. Please try again later.",
							type: "error",
							variant: "snackbar",
							key: uuidv4(),
						})
					);
					break;
				default:
					store.dispatch(
						enqueueMessage({
							content: "Something went wrong.",
							type: "error",
							variant: "snackbar",
							key: uuidv4(),
						})
					);
			}
		}
		return {
			isSuccess: false,
		};
	}
};
