// embeddings-search/src/embeddings.ts
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase configuration. Please check your environment variables.',
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface Doha {
  id: number
  doha_hi: string
  similarity: number
}

async function generateEmbeddings(search: string): Promise<number[]> {
  try {
    const { pipeline } = await import('@xenova/transformers')
    const generateEmbedding = await pipeline(
      'feature-extraction',
      'Supabase/gte-small',
    )

    const output = await generateEmbedding(search, {
      pooling: 'mean',
      normalize: true,
    })

    const embedding = Array.from(output.data)
    return embedding
  } catch (error) {
    console.error('Error generating embeddings:', error)
    throw error
  }
}

async function searchEmbeddings(
  embedding: number[],
  threshold = 0.78,
  count = 10,
): Promise<Doha[]> {
  try {
    const { data: dohas, error } = await supabase.rpc('match_dohas', {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: count,
    })

    if (error) {
      console.error('Error searching embeddings:', error)
      throw error
    }

    console.log(`Found ${dohas?.length || 0} similar dohas.`)
    return (dohas as Doha[]) || []
  } catch (error) {
    console.error('Error in searchEmbeddings:', error)
    throw error
  }
}

export { generateEmbeddings, searchEmbeddings }
