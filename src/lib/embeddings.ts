import { pipeline, env } from '@huggingface/transformers';

// Set cache directory to the preloaded path
env.cacheDir = './.model_cache';

let extractor: any = null;

export async function getEmbedding(text: string): Promise<number[]> {
    if (!extractor) {
        extractor = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small');
    }

    // Multilingual-E5 recommends prefixing with 'query: ' for queries
    const output = await extractor(`query: ${text}`, {
        pooling: 'mean',
        normalize: true,
    });

    return Array.from(output.data);
}

export async function getPassageEmbeddings(texts: string[]): Promise<number[][]> {
    if (!extractor) {
        extractor = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small');
    }

    const results: number[][] = [];
    for (const text of texts) {
        // Prefixing with 'passage: ' for better indexing performance
        const output = await extractor(`passage: ${text}`, {
            pooling: 'mean',
            normalize: true,
        });
        results.push(Array.from(output.data));
    }
    return results;
}
