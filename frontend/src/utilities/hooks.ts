import { useEffect } from "react";
import websocketService from "./websocket";
import { useAppSelector } from "redux/store";

export const useWebsocket = () => {
	const {isAuthenticated} = useAppSelector(state=> state.user)
	useEffect(() => {
		if (isAuthenticated) {
			websocketService.connect();
		} else {
			websocketService.disconnect();
		}
	}, [isAuthenticated]);
};
