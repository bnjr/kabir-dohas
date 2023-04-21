import {useEffect, useState} from 'react'
import SEOHead from '../components/SEO/SEOHead'
import HomePageButtons from '@/components/Page/HomePageButtons'
import Doha from '@/components/Doha/Doha'
import useFetchDohas from '@/hooks/useFetchDohas'
import {DohaData} from '@/types/types'

const Home = () => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const {loading, error, fetchRandomDoha} = useFetchDohas()

  useEffect(() => {
    const randomDoha = async () => {
      const doha = await fetchRandomDoha()
      if (doha) setDohaData(doha)
    }
    randomDoha()
  }, [])

  return (
    <>
      <SEOHead />
      {error ? (
        <div className='text-red-500 text-center my-4'>
          An error occurred: {error}
        </div>
      ) : (
        <Doha dohaData={dohaData} loading={loading} details />
      )}
      <HomePageButtons fetchRandomDoha={fetchRandomDoha} />
    </>
  )
}

export default Home
