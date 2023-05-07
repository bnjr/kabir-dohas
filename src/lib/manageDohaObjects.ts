import kv from '@vercel/kv'
import fs from 'fs'
import {JSONLoader} from 'langchain/document_loaders/fs/json'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import Airtable from 'airtable'
import {Document} from 'langchain/document'
import {HNSWLib, HNSWLibArgs} from 'langchain/vectorstores/hnswlib'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? ''
const AIRTABLE_TABLE_NAME = 'Dohas'
const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID)
type Embedding = {
  id: string
  vector: number[]
}

const fetchAllDohas = async (): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const dohas: any[] = []

    base(AIRTABLE_TABLE_NAME)
      .select({
        view: 'Grid view',
        fields: ['doha_hi'],
        // fields: ['doha_en'],
        // fields: ['meaning_en'],
        // fields: ['doha_hi', 'doha_en', 'meaning_en'],
        sort: [{field: 'id', direction: 'asc'}],
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            dohas.push(record.fields)
          })

          fetchNextPage()
        },
        (error) => {
          if (error) {
            reject(error)
          } else {
            const jsonString = JSON.stringify(dohas)
            resolve(new Blob([jsonString], {type: 'application/json'}))
          }
        }
      )
  })
}

export const precomputeDocs = async (): Promise<Document[]> => {
  const dohasBlob = await fetchAllDohas()
  const loader = new JSONLoader(dohasBlob)
  const docs = await loader.load()
  return docs
}

export const precomputeEmbeddings = async (
  docs: Document[]
): Promise<Embedding[]> => {
  const embeddings = new OpenAIEmbeddings()

  const precomputedEmbeddings = await Promise.all(
    docs.map(async (doc) => {
      const embedding = await embeddings.embedQuery(doc.pageContent)
      return {
        id: doc.metadata['line'],
        vector: Array.from(embedding),
      }
    })
  )
  return precomputedEmbeddings
}

export const saveDocumentsToRedis = async (docs: Document[]): Promise<void> => {
  const serializedDocs = JSON.stringify(docs)
  await kv.set('docs', serializedDocs)
}

export const loadDocumentsFromRedis = async (): Promise<Document[] | null> => {
  const serializedDocs = (await kv.get<string>('docs')) as unknown as Document[]

  if (!serializedDocs) return null

  return serializedDocs
}

export const getAllEmbeddingsFromKVHash = async (): Promise<
  Array<Embedding>
> => {
  try {
    // Fetch the hash entries from 'embedding1', 'embedding2', and 'embedding3'
    const hashEntries1 = await kv.hgetall('embedding1')
    const hashEntries2 = await kv.hgetall('embedding2')
    const hashEntries3 = await kv.hgetall('embedding3')

    // Combine the hash entries into a single object
    const combinedHashEntries = {
      ...hashEntries1,
      ...hashEntries2,
      ...hashEntries3,
    }

    // Convert the hash entries back to an array of Embeddings
    const embeddings: Array<Embedding> = Object.entries(
      combinedHashEntries
    ).map(([id, vectorJson]) => ({
      id,
      vector: vectorJson as number[],
    }))

    return embeddings
  } catch (error) {
    console.error('Error: ', (error as Error).message)
    throw error
  }
}

export const storeEmbeddingsInKVHash = async (
  embeddings: Array<Embedding>
): Promise<void> => {
  try {
    // Calculate the size of each part
    const partSize = Math.ceil(embeddings.length / 3)

    // Split the embeddings array into three parts
    const embeddingsPart1 = embeddings.slice(0, partSize)
    const embeddingsPart2 = embeddings.slice(partSize, partSize * 2)
    const embeddingsPart3 = embeddings.slice(partSize * 2)

    // Create a function to generate hash entries from an array of embeddings
    const createHashEntries = (embeddings: Array<Embedding>) =>
      embeddings.reduce((acc, embedding) => {
        acc[embedding.id] = JSON.stringify(embedding.vector)
        return acc
      }, {} as Record<string, string>)

    // Create hash entries for each part
    const hashEntries1 = createHashEntries(embeddingsPart1)
    const hashEntries2 = createHashEntries(embeddingsPart2)
    const hashEntries3 = createHashEntries(embeddingsPart3)

    // Store the hash entries under 'embedding1', 'embedding2', and 'embedding3'
    await kv.hset('embedding1', hashEntries1)
    await kv.hset('embedding2', hashEntries2)
    await kv.hset('embedding3', hashEntries3)
  } catch (error) {
    throw error
  }
}

export const createVectorStore = async (
  documents: Document[],
  precomputedEmbeddings: Array<Embedding>
): Promise<HNSWLib> => {
  const args: HNSWLibArgs = {
    space: 'cosine',
    numDimensions: precomputedEmbeddings[0]?.vector.length,
    docstore: undefined
  }

  const hnswlib = new HNSWLib(new OpenAIEmbeddings(), args)

  for (const doc of documents) {

    const precomputedEmbedding =
      precomputedEmbeddings[doc.metadata['line'] as number]

    if (precomputedEmbedding) {
      const embedding = new Float32Array(precomputedEmbedding.vector)
      await hnswlib.addVectors([Array.from(embedding)], [doc])
    }
  }

  return hnswlib
}

function getPrecomputedEmbeddings() {
  return JSON.parse(fs.readFileSync('precomputed_embeddings.json', 'utf-8'))
}

const saveprecomputeEmbeddings = (
  precomputedEmbeddings: {id: any; embedding: number[]}[]
) => {
  fs.writeFileSync(
    'precomputed_embeddings.json',
    JSON.stringify(precomputedEmbeddings, null, 2)
  )
}

// Utility function to set an embedding in Redis
const setEmbedding = async (id: string, embedding: number[]): Promise<void> => {
  try {
    await kv.set(id, JSON.stringify(embedding))
    return
  } catch (error) {
    throw error
  }
}

// Utility function to get an embedding from Redis
const getEmbedding = async (id: string): Promise<number[] | null> => {
  try {
    const embedding = await kv.get<string>(id)
    return embedding ? JSON.parse(embedding) : null
  } catch (error) {
    throw error
  }
}

// Store the precomputed embeddings in Redis
const storeEmbeddingsInKV = async (
  embeddings: Array<Embedding>
): Promise<void> => {
  try {
    for (const {id, vector} of embeddings) {
      await setEmbedding(id, vector)
      console.log(`Stored embedding for id ${id}`)
    }
    console.log('All embeddings stored in KV')
  } catch (error) {
    console.error('Error storing embeddings:', (error as Error).message)
  }
}
