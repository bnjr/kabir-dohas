import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SEOHead from '@/components/SEO/SEOHead'
import PageNavigation from '@/components/Page/PageNavigation'
import Doha from '@/components/Doha/Doha'
import Spinner from '@/components/Utils/Spinner'
import SearchBar from '@/components/Find/SearchBar'
import useFetchDohas from '@/hooks/useFetchDohas'
import { DohaData } from '@/types/types'

const Home = () => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const [searchInput, setSearchInput] = useState<string>('')
  const [foundDohas, setFoundDohas] = useState<DohaData[]>([])
  const { loading, error, fetchRandomDoha } = useFetchDohas()
  const router = useRouter()

  const isRandomDohaView = router.query.randomDoha === 'true'
  const isDaily = router.query.daily === 'true'

  useEffect(() => {
    if (isRandomDohaView) {
      const fetchDoha = async () => {
        const doha = await fetchRandomDoha(isDaily)
        if (doha) setDohaData(doha)
      }
      fetchDoha()
    } else {
      setDohaData(null)
      setFoundDohas([])
    }
  }, [router.query.randomDoha, router.query.daily, router.query.t])

  const handleGetRandomDoha = async () => {
    router.push(`/?randomDoha=true&daily=true&t=${Date.now()}`, undefined, { shallow: true })
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleAskKabir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/doha-query?searchQuery=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const handleChipClick = (mood: string) => {
    router.push(`/doha-query?searchQuery=${encodeURIComponent(mood)}`)
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
          {/* Home View - Show Kabir image and search */}
          {!isRandomDohaView && (
            <div className="flex flex-col items-center mt-8 w-full max-w-2xl mx-auto px-4 sm:px-6">
              <div className="mb-10 relative w-40 h-40 sm:w-48 sm:h-48 overflow-hidden rounded-3xl border-2 border-serene-accent/20 shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/kabir.png"
                  alt="Sant Kabir"
                  fill
                  className="object-cover scale-110"
                  sizes="(max-width: 768px) 160px, 192px"
                  priority
                />
              </div>
              <h1 className="text-4xl font-serif font-semibold mb-8 text-serene-text text-center tracking-tight">
                In search of wisdom...
              </h1>
              <SearchBar
                searchInput={searchInput}
                handleSearchInputChange={handleSearchInputChange}
                handleAskKabir={handleAskKabir}
                onChipClick={handleChipClick}
              />
              <hr className="w-full mt-10 mb-8 border-t border-serene-accent/10" />
            </div>
          )}

          {/* Receive a Doha View - Clean header without image */}
          {isRandomDohaView && (
            <div className="flex flex-col items-center mt-8 w-full max-w-2xl mx-auto px-4">
              <h1 className="text-4xl font-serif font-semibold mb-8 text-serene-text text-center tracking-tight">
                {isDaily ? 'Doha of the Day' : 'Wisdom Received'}
              </h1>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-8">
              <Spinner />
              <p className="text-lg font-sans text-serene-accent ml-4 animate-pulse">
                Consulting Kabir...
              </p>
            </div>
          )}
          {foundDohas.length > 0 && (
            <h2 className="text-2xl font-serif font-medium mb-6 text-serene-accent px-4 italic">
              Relevant Dohas...
            </h2>
          )}
          {foundDohas.map((doha) => (
            <Doha
              key={doha.id}
              dohaData={doha}
              loading={loading}
              details
            />
          ))}
          {dohaData && <Doha dohaData={dohaData} loading={loading} details />}
          <PageNavigation onReceiveDoha={handleGetRandomDoha} showSearch={isRandomDohaView} />
        </>
      )}
    </>
  )
}

export default Home
