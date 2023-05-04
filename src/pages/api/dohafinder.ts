// pages/api/doha-generator.ts

import {NextApiRequest, NextApiResponse} from 'next'
import {OpenAI} from 'langchain/llms/openai'
import {
  RetrievalQAChain,
} from 'langchain/chains'
import {JSONLoader} from 'langchain/document_loaders/fs/json'
import {HNSWLib} from 'langchain/vectorstores/hnswlib'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {VectorStore} from 'langchain/dist/vectorstores/base'
import {getCache, setCache} from '@/lib/cache'

const fetchAllDohas = async (): Promise<Blob> => {
  const cachedData = getCache('fetchAllDohas')
  if (cachedData) return cachedData
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dohas?all=true`
    )
    const blob = await response.blob()
    // Cache the data for 10 minutes (600,000 milliseconds)
    setCache('fetchAllDohas', blob, 600000)

    return blob
  } catch (error) {
    console.error('Error loading all dohas')
    return new Blob()
  }
}

const createVectorStore = async (): Promise<VectorStore> => {
  const dohasBlob = await fetchAllDohas()
  const loader = new JSONLoader(dohasBlob)
  const docs = await loader.load()

  // Load the docs into the vector store
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

  return vectorStore
}


const getDohaRetrievalChain = async (): Promise<RetrievalQAChain> => {
  const vectorStore = await createVectorStore()

  const chain = RetrievalQAChain.fromLLM(
    new OpenAI(),
    vectorStore.asRetriever(),
    {returnSourceDocuments: true}
  )
  return chain
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {userPrompt} = req.body

    try {
      const chain = await getDohaRetrievalChain()
      const response = await chain.call({
        query: userPrompt,
      })

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({error: (error as Error).message})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}

export default handler
