import Port from "../../models/port";
import db from "../../startup/db";

const singaporePorts = [
	{ name: "Tuas Port", coordinates: { lat: 1.264, lng: 103.63 } },
	{
		name: "Pasir Panjang Terminal",
		coordinates: { lat: 1.2645, lng: 103.752 },
	},
];
const ports = [...singaporePorts];

export async function seedPorts() {
	try {
		await Port.insertMany(ports);
		console.log("Ports seeded successfully");
	} catch (err) {
		console.error("Error inserting ports:", err);
	}
}
