import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey
    ? new OpenAI({ apiKey })
    : null;

if (!apiKey) {
    console.warn('OPENAI_API_KEY is not set in environment variables. Skipping instantiation.');
}
