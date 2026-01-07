import { pipeline, env } from '@huggingface/transformers';

// Set cache directory to the preloaded path
env.cacheDir = './.model_cache';

let extractor: any = null;

// ============================================
// Query Embedding Cache (LRU with TTL)
// ============================================
interface CacheEntry {
    embedding: number[];
    timestamp: number;
}

const embeddingCache = new Map<string, CacheEntry>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour
const MAX_CACHE_SIZE = 500;

function normalizeQuery(text: string): string {
    return text.toLowerCase().trim();
}

function evictOldestIfNeeded(): void {
    if (embeddingCache.size >= MAX_CACHE_SIZE) {
        // Map maintains insertion order, so first key is oldest
        const oldest = embeddingCache.keys().next().value;
        if (oldest) {
            embeddingCache.delete(oldest);
            console.log(`[EmbeddingCache] Evicted oldest entry: "${oldest.substring(0, 30)}..."`);
        }
    }
}

export async function getEmbedding(text: string): Promise<number[]> {
    const cacheKey = normalizeQuery(text);
    const cached = embeddingCache.get(cacheKey);

    // Check cache
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`[EmbeddingCache] HIT for: "${cacheKey.substring(0, 30)}..."`);
        return cached.embedding;
    }

    // Cache miss or expired - compute embedding
    if (!extractor) {
        console.log('[EmbeddingCache] Initializing embedding model...');
        extractor = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small');
    }

    // Multilingual-E5 recommends prefixing with 'query: ' for queries
    const output = await extractor(`query: ${text}`, {
        pooling: 'mean',
        normalize: true,
    });

    const embedding = Array.from(output.data) as number[];

    // Store in cache with LRU eviction
    evictOldestIfNeeded();
    embeddingCache.set(cacheKey, { embedding, timestamp: Date.now() });
    console.log(`[EmbeddingCache] MISS - cached: "${cacheKey.substring(0, 30)}..." (cache size: ${embeddingCache.size})`);

    return embedding;
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
        results.push(Array.from(output.data) as number[]);
    }
    return results;
}

// Cache statistics for monitoring
export function getEmbeddingCacheStats() {
    return {
        size: embeddingCache.size,
        maxSize: MAX_CACHE_SIZE,
        ttlMs: CACHE_TTL,
    };
}
