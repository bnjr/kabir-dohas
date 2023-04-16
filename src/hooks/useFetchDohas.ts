import {useState, useEffect} from 'react'
import {DohaData} from '@/types/types'

interface FetchDohasOptions {
  byIdList?: string[]
}

const useFetchDohas = (options: FetchDohasOptions = {}) => {
  const {byIdList} = options
  const [dohas, setDohas] = useState<DohaData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDohas = async () => {
      setLoading(true)

      let response
      if (byIdList) {
        response = await Promise.all(
          byIdList.map(async (id) => {
            const res = await fetch(`/api/doha/${id}`)
            return await res.json()
          })
        )
      } else {
        response = await fetch('/api/dohas')
        response = await response.json()
      }

      setDohas(response)
      setLoading(false)
    }

    fetchDohas()
  }, [byIdList])

  return {dohas, loading}
}

export default useFetchDohas
