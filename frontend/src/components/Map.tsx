import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
		if (!mapContainerRef.current) return;
		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			projection: "mercator",
		});

		return () => {
			mapRef.current?.remove();
		};
	}, []);
	return (
		<div
			id="map-container"
			ref={mapContainerRef}
			style={{ width: "100%", height: "100dvh" }}
		/>
	);
};

export default Map;
