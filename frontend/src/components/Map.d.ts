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
declare const Map: ({ markers }: MapProps) => import("react/jsx-runtime").JSX.Element;
export default Map;
