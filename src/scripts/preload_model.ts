import { pipeline, env } from '@huggingface/transformers';

// Set cache directory to a predictable local path
env.cacheDir = './.model_cache';

async function preload() {
    console.log('Pre-loading embedding model to ./.model_cache...');
    await pipeline('feature-extraction', 'Xenova/multilingual-e5-small');
    console.log('Model loaded successfully.');
}

preload().catch(console.error);
