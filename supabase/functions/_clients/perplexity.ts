import OpenAI from 'openai'
import { ensureGetEnv } from '../_utils/env.ts'

const apiKey = ensureGetEnv('PERPLEXITY_API_KEY')
if (!apiKey) {
  console.error(
    'Missing Perplexity API key. Please check your environment variables.'
  )
}
export const perplexity = new OpenAI({
  apiKey,
  baseURL: 'https://api.perplexity.ai',
})
