import { NextApiRequest, NextApiResponse } from 'next'
import { generateEmbeddings, llm, searchEmbeddings } from '@/lib'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userPrompt } = req.body

    try {
      console.log('Generating embeddings for the search query...')
      const searchEmbedding = await generateEmbeddings(userPrompt)

      console.log('Searching for relevant dohas...')
      const dohas = await searchEmbeddings(searchEmbedding)

      if (dohas && dohas.length > 0) {
        console.log('Relevant dohas found.')
        console.log('') // Add a blank line for readability

        console.log('Generating response...')

        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Transfer-Encoding': 'chunked',
        })

        // Call the llm function with the relevant dohas and user query
        await llm(
          dohas.map((doha) => `Doha number ${doha.id}: ${doha.doha_hi}`),
          userPrompt,
          res
        )

      } else {
        console.log('No relevant dohas found.')
        console.log('') // Add a blank line for readability
        res.status(404).json({ error: 'No relevant dohas found' })
      }

    } catch (error) {
      console.error('Error in finding doha:', (error as Error).message)
      res.status(500).json({ error: (error as Error).message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler
