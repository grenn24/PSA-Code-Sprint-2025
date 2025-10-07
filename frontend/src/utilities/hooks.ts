import { useCallback, useEffect, useState } from "react";
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


export function useResizeObserverRef<T extends HTMLElement>(
	measure: "contentRect" | "client" | "offset" = "contentRect"
) {
	const [size, setSize] = useState<{ width: number; height: number }>({
		width: 0,
		height: 0,
	});

	const ref = useCallback(
		(node: T | null) => {
			if (!node) return;

			const updateSize = () => {
				if (measure === "contentRect") {
					return;
				}
				if (measure === "client") {
					setSize({
						width: node.clientWidth,
						height: node.clientHeight,
					});
				}
				if (measure === "offset") {
					setSize({
						width: node.offsetWidth,
						height: node.offsetHeight,
					});
				}
			};

			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					if (measure === "contentRect") {
						const { width, height } = entry.contentRect;
						setSize({ width, height });
					} else {
						updateSize();
					}
				}
			});

			resizeObserver.observe(node);
			// set immediately
			updateSize();

			return () => {
				resizeObserver.disconnect();
			};
		},
		[measure]
	);

	return { ref, ...size };
}