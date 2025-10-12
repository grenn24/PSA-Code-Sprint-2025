import "dotenv/config";
import pineconeClient from "../../utilities/pinecone.js";

async function createIndex() {
    try {
        await pineconeClient.createIndex();
        console.log("Pinecone index created successfully");
    } catch (err) {
        console.error("Error during index creation:", err);
    }
}

createIndex();
