import {NextApiRequest, NextApiResponse} from 'next'
import {
  precomputeDocs,
  precomputeEmbeddings,
  saveDocumentsToRedis,
  storeEmbeddingsInKVHash,
} from '@/lib/manageDohaObjects'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const startTime = performance.now()

      const docs = await precomputeDocs()
      await saveDocumentsToRedis(docs)

      const precomputedEmbeddings = await precomputeEmbeddings(docs)
      await storeEmbeddingsInKVHash(precomputedEmbeddings)

      const endTime = performance.now()
      const duration = endTime - startTime
      console.log(`The function took ${duration} milliseconds to complete.`)
      res.status(200).json({message: 'Embeddings saved successfully'})
    } catch (error) {
      console.log((error as Error).message)
      res.status(500).json({error: (error as Error).message})
    }
  } else {
    res.status(405).json({error: 'Method not allowed'})
  }
}

export default handler
