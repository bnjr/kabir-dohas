// src/hooks/useDoha.ts
import {useState, useEffect} from 'react'
import {DohaData} from '../types/types'

interface UseRandomDoha {
  dohaData: DohaData | null
  loading: boolean
  error: string | null
  fetchRandomDoha: () => Promise<void>
}
const useRandomDoha = (): UseRandomDoha => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRandomDoha()
  }, [])

  const fetchRandomDoha = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/randomdoha')
      if (!response.ok) {
        throw new Error('Failed to fetch Doha data')
      }
      const data: DohaData = await response.json()
      setDohaData(data)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return {dohaData, loading, error, fetchRandomDoha}
}

export default useRandomDoha
