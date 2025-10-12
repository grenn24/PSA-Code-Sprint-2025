import "dotenv/config";
import pineconeClient from "../../utilities/pinecone.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFParse } from "pdf-parse";
import path from "path";
import openai from "../../utilities/openai.js";
import { v4 } from "uuid";
import fs, { readFileSync } from "fs";
import { Document } from "langchain/document";
const BASE_PATH = "./data";
function getPdfPaths(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(getPdfPaths(filePath));
        }
        else if (file.endsWith(".pdf")) {
            results.push(filePath);
        }
    });
    return results;
}
export async function ingest() {
    const pdfPaths = getPdfPaths(BASE_PATH);
    console.log("pdf paths retrieved");
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 200,
    });
    await Promise.all(pdfPaths.map(async (pdfPath) => {
        try {
            const relativePath = path.relative(BASE_PATH, pdfPath);
            const namespace = relativePath.split(path.sep)[0];
            console.log(`Reading path ${pdfPath}`);
            const buffer = readFileSync(pdfPath);
            const pdfData = new PDFParse({ data: buffer });
            const pdfText = await pdfData.getText();
            const docs = [new Document({ pageContent: pdfText.text })];
            const chunks = await splitter.splitDocuments(docs);
            const embeddings = await openai.getEmbeddings(chunks.map((c) => c.pageContent));
            const BATCH_SIZE = 50;
            for (let i = 0; i < embeddings.length; i += BATCH_SIZE) {
                const batch = embeddings.slice(i, i + BATCH_SIZE);
                const records = batch.map((values) => ({
                    id: v4(),
                    values,
                    metadata: { text: chunks[i].pageContent },
                }));
                await pineconeClient.upsert(records, namespace);
            }
            console.log(`Upserted ${chunks.length} chunks from ${pdfPath} into namespace "${namespace}"`);
        }
        catch (err) {
            console.error("Error processing PDF:", pdfPath, err);
        }
    }));
    console.log("Pinecone index ingested successfully");
}
ingest();
//# sourceMappingURL=ingest.js.map