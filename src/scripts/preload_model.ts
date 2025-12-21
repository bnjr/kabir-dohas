import { pipeline } from '@huggingface/transformers';

async function preload() {
    console.log('Pre-loading embedding model...');
    await pipeline('feature-extraction', 'Xenova/multilingual-e5-small');
    console.log('Model loaded successfully.');
}

preload().catch(console.error);
