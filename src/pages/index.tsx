import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEO/SEOHead'
import HomePageButtons from '@/components/Page/HomePageButtons'
import Doha from '@/components/Doha/Doha'
import Spinner from '@/components/Utils/Spinner'
import SearchBar from '@/components/Find/SearchBar'
import SynopsisCard from '@/components/Find/SynopsisCard'
import useFetchDohas from '@/hooks/useFetchDohas'
import { DohaData } from '@/types/types'

const Home = () => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const [searchInput, setSearchInput] = useState<string>('')
  const [foundDohas, setFoundDohas] = useState<DohaData[]>([])
  const { loading, error, synopsis, fetchRandomDoha, fetchDohasFromFinder } =
    useFetchDohas()
  const router = useRouter()

  useEffect(() => {
    const randomDoha = async () => {
      const doha = await fetchRandomDoha()
      if (doha) setDohaData(doha)
    }
    if (router.query.randomDoha === 'true') randomDoha()
  }, [router.query.randomDoha])

  const handleGetRandomDoha = async () => {
    setFoundDohas(() => [])
    setDohaData(null)
    const doha = await fetchRandomDoha()
    if (doha) setDohaData(doha)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleAskKabir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFoundDohas(() => [])
    setDohaData(null)
    const searchQuery = `What does Kabir say about: ${searchInput}`
    fetchDohasFromFinder(searchQuery)
  }

  return (
    <>
      <SEOHead />
      {error ? (
        <div className="text-red-500 text-center my-4">
          An error occurred: {error}
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start mt-4 w-4/5 sm:w-2/3 lg:w-4/5 mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-indigo-200">
              What does Kabir say about...
            </h1>
            <SearchBar
              searchInput={searchInput}
              handleSearchInputChange={handleSearchInputChange}
              handleAskKabir={handleAskKabir}
            />
            <hr className="w-full mb-4 border-t border-gray-300" />
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Spinner />
              <p className="text-xl font-semibold text-indigo-200 ml-4">
                Thinking...
              </p>
            </div>
          )}
          {synopsis && <SynopsisCard synopsis={synopsis} />}
          {foundDohas.length > 0 && (
            <h2 className="text-xl font-bold mb-4 text-indigo-200">
              Reference Dohas...
            </h2>
          )}
          {foundDohas.map((doha) => (
            <Doha
              key={dohaData?.id}
              dohaData={doha}
              loading={loading}
              details
            />
          ))}
          {dohaData && <Doha dohaData={dohaData} loading={loading} details />}
          <HomePageButtons fetchRandomDoha={handleGetRandomDoha} />
        </>
      )}
    </>
  )
}

export default Home
