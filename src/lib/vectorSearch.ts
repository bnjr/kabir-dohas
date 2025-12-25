import dohasData from '../data/dohas_with_embeddings.json';

export interface Doha {
    id: string;
    doha_hi: string;
    doha_en: string;
    meaning_en: string;
    embedding: number[];
}

/**
 * Calculates cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]) {
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        mA += vecA[i] * vecA[i];
        mB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
}

/**
 * Searches for relevant dohas using in-memory vector similarity
 */
export async function searchDohasLocal(queryEmbedding: number[], limit = 5, threshold = 0.3) {
    const dohas = dohasData as Doha[];

    const scored = dohas.map(doha => ({
        ...doha,
        similarity: cosineSimilarity(queryEmbedding, doha.embedding)
    }))
        .filter(doha => doha.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

    return scored;
}
