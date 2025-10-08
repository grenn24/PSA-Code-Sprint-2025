import { WebsocketMessage } from "@common/types/http";

export interface Listener {
	(message: WebsocketMessage): void;
}
class WebsocketService {
	private backendWSS: WebSocket | null = null;
	private url = `${
		import.meta.env.VITE_ENV === "production" ? "wss" : "ws"
	}://${import.meta.env.VITE_BACKEND_HOST}`;
	private listeners: Listener[] = [];

	// Connect to backend websocket
	connect() {
		if (this.backendWSS) {
			return;
		}

		const accessToken = sessionStorage.getItem("X-Access-Token");
		this.backendWSS = new WebSocket(
			`${this.url}?X-Access-Token=${accessToken}`
		);

		this.backendWSS.onopen = () => {
			console.log("WebSocket connected to backend");
		};

		this.backendWSS.onmessage = (event) => {
			console.log("Message from backend:", event.data);
			const data = JSON.parse(event.data);
			this.listeners.forEach((h) => h(data));
		};

		this.backendWSS.onclose = (e) => {
			const { code, reason } = e;
			console.log(
				`WebSocket disconnected from backend:\nCode: ${code}\nReason: ${reason}`
			);
			console.log("Attempting to reconnect in 15s");
			this.backendWSS = null; // Attempt to reconnect in 15 seconds
			setTimeout(() => {
				this.connect();
			}, 15000);
		};

		this.backendWSS.onerror = (e) => {
			console.error("WebSocket error:", e);
		};
	}

	disconnect() {
		if (this.backendWSS) {
			console.log("closing");
			this.backendWSS.close();
		}
	}

	send(message: WebsocketMessage) {
		if (this.backendWSS && this.backendWSS.readyState === WebSocket.OPEN) {
			this.backendWSS.send(JSON.stringify(message));
		} else {
			console.warn("Websocket is not open");
		}
	}

	addListener(listener: Listener) {
		this.listeners.push(listener);
	}

	addListeners(listeners: Listener[]) {
		this.listeners.push(...listeners);
	}

	removeListener(listener: Listener) {
		this.listeners = this.listeners.filter((h) => h !== listener);
	}

	removeListeners(listeners: Listener[]) {
		this.listeners = this.listeners.filter((h) => !listeners.includes(h));
	}

	removeAllListeners() {
		this.listeners = [];
	}
}

const websocketService = new WebsocketService();
export default websocketService;

/*
	broadcast(data: any) {
		this.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(data));
			}
		});
	}
*/
