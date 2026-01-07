import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SEOHead from '@/components/SEO/SEOHead'
import Doha from '@/components/Doha/Doha'
import SearchPageLayout from '@/components/Layouts/SearchPageLayout'
import useFetchDohas from '@/hooks/useFetchDohas'
import { DohaData } from '@/types/types'

const Home = () => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const [searchInput, setSearchInput] = useState<string>('')
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

  // Header content with Kabir image
  const headerContent = (
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
  )

  return (
    <>
      <SEOHead />
      {error ? (
        <div className="text-red-500 text-center my-4">
          An error occurred: {error}
        </div>
      ) : isRandomDohaView ? (
        // Doha of the Day view
        <>
          <div className="flex flex-col items-center mt-8 w-full max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-serif font-semibold mb-8 text-serene-text text-center tracking-tight">
              {isDaily ? 'Doha of the Day' : 'Wisdom Received'}
            </h1>
          </div>
          {dohaData && <Doha dohaData={dohaData} loading={loading} details />}
        </>
      ) : (
        // Home search view
        <SearchPageLayout
          headerContent={headerContent}
          title="In search of wisdom..."
          searchInput={searchInput}
          onSearchInputChange={handleSearchInputChange}
          onSearchSubmit={handleAskKabir}
          onChipClick={handleChipClick}
          loading={loading}
          loadingMessage="Consulting Kabir..."
          onReceiveDoha={handleGetRandomDoha}
        />
      )}
    </>
  )
}

export default Home

