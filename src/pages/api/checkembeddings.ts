import {NextApiRequest, NextApiResponse} from 'next'
import {
  createVectorStore,
  getAllEmbeddingsFromKVHash,
  loadDocumentsFromRedis,
} from '@/lib/manageDohaObjects'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const startTime = performance.now()

      const docs = await loadDocumentsFromRedis()
      if (docs) {
        const embeddings = await getAllEmbeddingsFromKVHash()
        const verctorStore = await createVectorStore(docs, embeddings)
        console.log('Vector store: ', verctorStore)
        const endTime = performance.now()
        const duration = endTime - startTime
        console.log(`The function took ${duration} milliseconds to complete.`)
        res.status(200).json({message: 'Embeddings loaded successfully'})
      } else throw Error('No docs')
    } catch (error) {
      res.status(500).json({error: (error as Error).message})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}

export default handler
