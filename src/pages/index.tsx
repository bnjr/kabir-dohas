import {useState, useEffect} from 'react'
import {DohaData} from '../types/types'
import DohaDisplayRandom from '../components/DohaDisplayRandom'
import SEOHead from '../components/SEOHead'

const Home = () => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDoha()
  }, [])

  const fetchDoha = async () => {
    setLoading(true)
    const response = await fetch('/api/doha')
    const data: DohaData = await response.json()
    setDohaData(data)
    setLoading(false)
  }

  return (
    <>
      <SEOHead />
      <DohaDisplayRandom
        dohaData={dohaData}
        loading={loading}
        fetchDoha={fetchDoha}
      />
    </>
  )
}

export default Home
