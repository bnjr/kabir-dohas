import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseInfo } from '@/lib'
import { type ChatCompletionChunk } from 'openai/resources'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { query } = req.body
  try {
    // Set headers for chunked transfer
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Transfer-Encoding', 'chunked')

    // Start sending dummy data every second
    const dummyDataInterval = setInterval(() => {
      res.write('IGNORE\n')
    }, 1000) // 1000 milliseconds = 1 second

    const response = await fetch(
      `${supabaseInfo().SUPABASE_URL}/functions/v1/doha-query`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseInfo().SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ query }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Clear the interval for sending dummy data as soon as real data starts to arrive
    clearInterval(dummyDataInterval)

    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    let buffer = ''

    const processStream = ({
      done,
      value,
    }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        console.log('Stream complete')
        return
      }

      // Decode the stream chunk to text
      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk

      // Process the buffer line by line
      let lines = buffer.split('\n')
      buffer = lines.pop() || '' // Keep the last incomplete line in the buffer

      lines.forEach((line) => {
        if (line.startsWith('data: ')) {
          const data: ChatCompletionChunk = JSON.parse(
            line.replace('data: ', '')
          )
          const delta = data.choices[0].delta.content
          if (delta) {
            // Update the UI with the new content
            res.write(delta)
          }
        }
      })

      // Read the next chunk
      reader
        ?.read()
        .then(processStream)
        .catch((readError) => {
          console.error('Error reading the stream:', readError)
        })
    }

    reader
      ?.read()
      .then(processStream)
      .catch((readError) => {
        console.error('Error reading the stream:', readError)
      })
  } catch (error) {
    console.error('Error in finding doha:', (error as Error).message)
    res.status(500).json({ error: (error as Error).message })
  }
}

export default handler
