import {useState} from 'react'
import {DohaData} from '@/types/types'

interface FetchDohasOptions {
  page?: number
  itemsPerPage?: number
}

const useFetchDohas = () => {
  const [loading, setLoading] = useState(false)
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

  const fetchDohasFromFinder = async (
    userPrompt: string
  ): Promise<{synopsis: string; dohas: DohaData[]}> => {
    setLoading(true)
    try {
      const response = await fetch('/api/dohafinder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userPrompt}),
      })
      const data = await response.json()

      const dohasPromises = data.sourceDocuments.map(async (doc: any) => {
        const dohaResponse = await fetch(`/api/doha/${doc.metadata.line}`)
        const dohaData = await dohaResponse.json()
        return dohaData
      })

      const dohas = await Promise.all(dohasPromises)

      setLoading(false)
      return {synopsis: (data.text as string).trim(), dohas}
    } catch (err) {
      setLoading(false)
      setError('Failed to fetch dohas from finder' + (err as Error).message)
      return {synopsis: '', dohas: []}
    }
  }

  return {
    loading,
    error,
    fetchDohas,
    fetchDoha,
    fetchRandomDoha,
    fetchAllDohas,
    fetchDohasFromFinder,
  }
}

export default useFetchDohas
