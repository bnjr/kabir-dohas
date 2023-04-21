import {useState} from 'react'
import {DohaData} from '@/types/types'

interface FetchDohasOptions {
  page?: number
  itemsPerPage?: number
}

const useFetchDohas = () => {
  const [loading, setLoading] = useState(true)
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

  return {loading, error, fetchDohas, fetchDoha, fetchRandomDoha}
}

export default useFetchDohas
