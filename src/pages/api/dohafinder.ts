import {OpenAI} from 'langchain/llms/openai'
import {RetrievalQAChain} from 'langchain/chains'
import {VectorStore} from 'langchain/dist/vectorstores/base'
import {
  createVectorStore,
  getAllEmbeddingsFromKVHash,
  loadDocumentsFromRedis,
} from '@/lib/manageDohaObjects'
import {NextApiRequest, NextApiResponse} from 'next'

const getVectorStore = async (): Promise<VectorStore> => {
  try {
    const docs = await loadDocumentsFromRedis()
    if (docs) {
      const embeddings = await getAllEmbeddingsFromKVHash()
      const vectorStore = await createVectorStore(docs, embeddings)
      return vectorStore
    } else {
      console.error('Error getting docs')
      throw Error('Error getting docs')
    }
  } catch (error) {
    console.error('Error getting VectorStore: ', (error as Error).message)
    throw Error('Error getting VectorStore')
  }
}

const getDohaRetrievalChain = async (): Promise<RetrievalQAChain> => {
  try {
    const vectorStore = await getVectorStore()

    const chain = RetrievalQAChain.fromLLM(
      new OpenAI(),
      vectorStore.asRetriever(),
      {returnSourceDocuments: true}
    )
    return chain
  } catch (error) {
    console.error('Error in creating chain:', (error as Error).message)
    throw error
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {userPrompt} = req.body

    try {
      const chain = await getDohaRetrievalChain()

      const response = await chain?.call({
        query: userPrompt,
      })

      res.status(200).json(response)
    } catch (error) {
      console.error('Error in finding doha:', (error as Error).message)
      res.status(500).json({error: (error as Error).message})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}

export default handler
