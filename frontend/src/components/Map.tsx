import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type MarkerData = {
	coordinates: {
		lng: number;
		lat: number;
	};
	title?: string;
};

type MapProps = {
	markers?: MarkerData[];
};

const Map = ({ markers=[] }: MapProps) => {
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const markersRef = useRef<mapboxgl.Marker[]>([]); // keep track of current markers

	useEffect(() => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
		if (!mapContainerRef.current) return;

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [103.8198, 1.3521],
			zoom: 10,
			projection: "mercator",
		});

		mapRef.current = map;

		return () => {
			map.remove();
		};
	}, []);

	// Whenever `markers` changes → update markers on map
	useEffect(() => {
		if (!mapRef.current) return;

		// Remove old markers
		markersRef.current.forEach((marker) => marker.remove());
		markersRef.current = [];

		// Add new markers
		markers.forEach((m) => {
			const marker = new mapboxgl.Marker()
				.setLngLat([m.coordinates?.lng, m.coordinates?.lat])
				.setPopup(
					new mapboxgl.Popup().setHTML(`<h3>${m.title ?? ""}</h3>`)
				)
				.addTo(mapRef.current!);

			markersRef.current.push(marker);
		});
	}, [markers]);

	return (
		<div
			id="map-container"
			ref={mapContainerRef}
			style={{ width: "100%", height: "100dvh" }}
		/>
	);
};

export default Map;
