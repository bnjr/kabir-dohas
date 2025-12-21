import { useState } from 'react'
import { DohaData } from '@/types/types'
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

  const fetchDohasFromFinder = async (query: string, signal?: AbortSignal): Promise<void> => {
    setLoading(true)
    setSynopsis('') // Clear the synopsis before making the request
    try {
      // Adjust the URL to include the query as a URL search parameter
      const url = new URL('/api/doha-query', window.location.href)
      url.searchParams.append('query', query)

      const response = await fetch(url.toString(), {
        method: 'GET', // Changed to GET
        headers: {
          'Content-Type': 'application/json',
        },
        signal, // Pass the abort signal to fetch
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (reader) {
        const decoder = new TextDecoder('utf-8')
        try {
          while (true) {
            // Check if aborted before reading
            if (signal?.aborted) {
              reader.cancel()
              break
            }
            const { done, value } = await reader.read()
            if (done) {
              break
            }
            const chunk = decoder.decode(value)
            setSynopsis((prevSynopsis) => prevSynopsis + chunk) // Update the synopsis state
            setLoading(false) // Moved inside the if(reader) block to ensure it's set after processing
          }
        } finally {
          reader.releaseLock()
        }
      } else {
        console.error('Response body is null')
        setError('No response body available')
      }
    } catch (err) {
      // Ignore abort errors - these are expected when cancelling duplicate requests
      if ((err as Error).name === 'AbortError') {
        console.log('Request was aborted')
        return
      }
      console.error('Failed to fetch dohas from finder:', err)
      setError('Failed to fetch dohas from finder' + (err as Error).message)
    } finally {
      // Consider moving setLoading(false) inside the reader processing block if you want to wait until streaming is complete
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
