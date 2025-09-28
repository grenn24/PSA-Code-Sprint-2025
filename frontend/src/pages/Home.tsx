import { useEffect, useState } from "react";
import Map from "../components/Map";
import Port from "@common/types/port";
import portService from "../services/port";

const Home = () => {
	const [ports, setPorts] = useState<Port[]>([]);
	useEffect(() => {
		portService.getAllPorts().then((res) => setPorts(res.data));
	}, []);
	console.log(ports);
	return (
		<div>
			Home
			<Map
				markers={ports.map((port) => ({
					title: port.name,
					coordinates: port.coordinates,
				}))}
			/>
		</div>
	);
};

export default Home;
