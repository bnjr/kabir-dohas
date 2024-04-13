import OpenAI from 'openai';

const apiKey = process.env.PERPLEXITY_API_KEY;
if (!apiKey) {
  console.error(
    'Missing Perplexity API key. Please check your environment variables.'
  );
  process.exit(1);
}
export const perplexity = new OpenAI({ apiKey, baseURL: 'https://api.perplexity.ai' });
