import { useEffect } from "react";
import websocketService from "./websocket";

export const useWebsocket = () => {
	useEffect(() => {
		websocketService.connect();
	}, []);
};
