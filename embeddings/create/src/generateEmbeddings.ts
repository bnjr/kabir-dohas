// import { pipeline } from '@xenova/transformers'
import { createClient } from '@supabase/supabase-js'
import { CsvRow } from './read-CSV'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

console.log({supabaseKey, supabaseUrl})

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

async function generateEmbeddings(dohas: CsvRow[]) {
  const { pipeline } = await import('@xenova/transformers');
  const generateEmbedding = await pipeline(
    'feature-extraction',
    'Supabase/gte-small',
  )

  for (const doha of dohas) {
    const { id, doha_hi, doha_en, meaning_en } = doha

    // Generate a vector using Transformers.js
    const output = await generateEmbedding(meaning_en, {
      pooling: 'mean',
      normalize: true,
    })

    // Extract the embedding output
    const embedding = Array.from(output.data)

    // Store the vector in Postgres
    const { data, error } = await supabase.from('dohas').insert({
      id,
      doha_hi,
      doha_en,
      meaning_en,
      embedding,
    })

    if (error) {
      console.error('Error storing embedding:', error)
    } else {
      // console.log('Embedding stored successfully for doha:', id)
    }
  }
}

export { generateEmbeddings }
