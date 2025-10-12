export declare class PineconeClient {
    private client;
    private INDEX_NAME;
    private NAMESPACES;
    constructor();
    createIndex(): Promise<void>;
    upsert(records: {
        id: string;
        values: number[];
        metadata: Record<string, any>;
    }[], namespace?: string): Promise<void>;
    deleteAll(): Promise<void>;
    /**
     * Query the index for top K similar vectors to the given embedding
     * @param vector The query vector
     * @param namespace Optional namespace
     * @param topK Number of results to return
     * @returns Array of matches with id, score, and metadata
     */
    query(vector: number[], namespaces?: string[], topK?: number): Promise<{
        id: string;
        score?: number;
        metadata?: Record<string, any>;
        namespace: string;
    }[]>;
}
declare const pineconeClient: PineconeClient;
export default pineconeClient;
