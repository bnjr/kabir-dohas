import { useState } from 'react'
import { DohaData } from '@/types/types'
import { supabaseInfo } from '@/lib/supabaseClient'
import { type ChatCompletionChunk } from 'openai/resources'
interface FetchDohasOptions {
  page?: number
  itemsPerPage?: number
}

const useFetchDohas = () => {
  const [loading, setLoading] = useState(false)
  const [synopsis, setSynopsis] = useState('')
  const [error, setError] = useState<string | null>(null)

  const fetchDohas = async (options: FetchDohasOptions = {}) => {
    const itemsPerPage = options.itemsPerPage ?? 5
    const page = options.page ?? 1
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/dohas?page=${page}&limit=${itemsPerPage}`
      )
      const dohas: DohaData[] = await response.json()
      return dohas
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const fetchDoha = async (dohaId: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/doha/${dohaId}`)
      const doha: DohaData = await response.json()
      return doha
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const fetchRandomDoha = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/randomdoha')
      const doha: DohaData = await response.json()
      return doha
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllDohas = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/dohas?all=true')
      const dohas: DohaData[] = await response.json()
      return dohas
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const fetchDohasFromFinder = async (query: string): Promise<void> => {
    setLoading(true)
    setSynopsis('')
    try {
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
            console.log(data)
            const delta = data.choices[0].delta.content
            if (delta) {
              // Update the UI with the new content
              setSynopsis((prevSynopsis) => prevSynopsis + delta)
              setLoading(false)
            }
          }
        })

        // Read the next chunk
        reader
          ?.read()
          .then(processStream)
          .catch((readError) => {
            console.error('Error reading the stream:', readError)
            setLoading(false)
          })
      }

      reader
        ?.read()
        .then(processStream)
        .catch((readError) => {
          console.error('Error reading the stream:', readError)
          setLoading(false)
        })
    } catch (err) {
      setLoading(false)
      setError('Failed to fetch dohas from finder' + (err as Error).message)
    }
  }

  return {
    loading,
    error,
    synopsis,
    fetchDohas,
    fetchDoha,
    fetchRandomDoha,
    fetchAllDohas,
    fetchDohasFromFinder,
  }
}

export default useFetchDohas
