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
      const response = await fetch('/api/doha-finder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (reader) {
        const decoder = new TextDecoder('utf-8')
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          setSynopsis((prevSynopsis) => prevSynopsis + chunk) // Update the synopsis state
          setLoading(false)
        }
      }
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
