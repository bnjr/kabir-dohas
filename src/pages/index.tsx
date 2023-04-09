import {useState, useEffect} from 'react'
import Head from 'next/head'

import Spinner from './components/spinner'

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
      <Head>
        <title>Kabir's Dohas</title>
        <meta
          name='description'
          content="Discover the wisdom of Kabir's Dohas, translated and explained."
        />
        <meta name='keywords' content='Kabir, Dohas, Translation, Meaning' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta property='og:title' content="Kabir's Dohas" />
        <meta
          property='og:description'
          content="Discover the wisdom of Kabir's Dohas, translated and explained."
        />
        <meta property='og:image' content='https://kabir-dohas.vercel.app/images/kabir.png' />
        <meta property='og:type' content='website' />
        <link rel='canonical' href='https://kabir-dohas.vercel.app/' />
      </Head>

      <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-4'>
        {dohaData && (
          <div className='bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full'>
            <h1 className='text-2xl font-semibold mb-4 text-indigo-700'>
              {"Kabir's Doha"}
            </h1>
            <div className='border-t border-b border-indigo-300 py-4 mb-4'>
              <p className='text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
                {dohaData.Doha}
              </p>
            </div>
            <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
              Translation
            </h2>
            <p className='mb-4 text-gray-800'>{dohaData.EN}</p>
            <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
              Meaning
            </h2>
            <p className='text-gray-800'>{dohaData.Meaning}</p>
            <button
              className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
              onClick={fetchDoha}
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center'>
                  <Spinner />
                  <span className='ml-2'>Loading...</span>
                </div>
              ) : (
                'Get Another Doha'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
