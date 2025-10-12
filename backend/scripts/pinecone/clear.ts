import "dotenv/config";
import pineconeClient from "../../utilities/pinecone.js";

async function clear() {
	try {
		await pineconeClient.deleteAll();
		console.log("Pinecone index cleared successfully");
	} catch (err) {
		console.error("Error during clearing:", err);
	}
}

clear();
