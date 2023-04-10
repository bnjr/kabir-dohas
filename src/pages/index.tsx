import {useState, useEffect} from 'react'
import DohaDisplay from '../components/DohaDisplay'
import SEOHead from '../components/SEOHead'
interface DohaData {
  Doha: string
  EN: string
  Meaning: string
}

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
      <DohaDisplay
        dohaData={dohaData}
        loading={loading}
        fetchDoha={fetchDoha}
      />
    </>
  )
}

export default Home
