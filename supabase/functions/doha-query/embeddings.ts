// embeddings-search/src/embeddings.ts
import { supabase } from '../_clients/supabase.ts';

interface Doha {
  id: number
  doha_hi: string
  similarity: number
}

// @ts-ignore TODO: import Supabase AI types.
const model = new Supabase.ai.Session("gte-small");

async function generateEmbeddings(search: string): Promise<number[]> {
  try {    
    console.log('generateEmbeddings, start')

    const output = await model.run(search, {
      mean_pool: true,
      normalize: true,
    });

    console.log('generateEmbeddings, finish')

    // const embedding = Array.from(output.data)
    return output as number[]
  } catch (error) {
    console.error('Error generating embeddings:', error)
    throw error
  }
}

async function searchEmbeddings(
  embedding: number[],
  threshold = 0.78,
  count = 10
): Promise<Doha[]> {
  try {
    const { data: dohas, error } = await supabase.rpc('match_dohas', {
      //@ts-ignore: type mismatch
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
