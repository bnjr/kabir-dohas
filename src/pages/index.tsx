import {useState, useEffect} from 'react'
import DohaDisplay from './components/DohaDisplay'
import AboutSection from './components/AboutSection'
import SEOHead from './components/SEOHead'
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
      <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-4'>
        <DohaDisplay
          dohaData={dohaData}
          loading={loading}
          fetchDoha={fetchDoha}
        />
        <AboutSection />
      </div>
    </>
  )
}

export default Home
