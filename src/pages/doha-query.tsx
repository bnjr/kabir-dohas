import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEO/SEOHead'
import Spinner from '@/components/Utils/Spinner'
import SynopsisCard from '@/components/Find/SynopsisCard'
import PageNavigation from '@/components/Page/PageNavigation'
import useFetchDohas from '@/hooks/useFetchDohas'
import SearchBar from '@/components/Find/SearchBar'

const DohaQueryPage = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const { loading, error, synopsis, fetchDohasFromFinder } = useFetchDohas()
  const router = useRouter()

  useEffect(() => {
    // Create AbortController to cancel duplicate requests (React StrictMode fix)
    const abortController = new AbortController()

    const fetchData = async () => {
      const queryParam = router.query.searchQuery
      if (queryParam) {
        // Ensure that queryParam is a string before passing it to fetchDohasFromFinder
        const searchQuery = Array.isArray(queryParam)
          ? queryParam[0]
          : queryParam
        setSearchInput(searchQuery)
        await fetchDohasFromFinder(searchQuery, abortController.signal)
      }
    }
    fetchData()

    // Cleanup: abort any in-flight request when effect re-runs or component unmounts
    return () => {
      abortController.abort()
    }
  }, [router.query.searchQuery])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleAskKabir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Update the URL with the new search query
    router.push(`/doha-query?searchQuery=${encodeURIComponent(searchInput)}`)
  }

  const handleChipClick = (mood: string) => {
    setSearchInput(mood)
    router.push(`/doha-query?searchQuery=${encodeURIComponent(mood)}`)
  }

  return (
    <>
      <SEOHead title="Search Results" />
      {error ? (
        <div className="text-red-500 text-center my-4">
          An error occurred: {error}
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-8 w-full max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl font-serif font-semibold mb-2 text-serene-text text-center tracking-tight">
              Seeking wisdom on...
            </h1>
            <p className="text-serene-muted mb-8 text-center font-sans">
              Ask a question or select a theme to explore Kabir's teachings.
            </p>
            <SearchBar
              searchInput={searchInput}
              handleSearchInputChange={handleSearchInputChange}
              handleAskKabir={handleAskKabir}
              onChipClick={handleChipClick}
            />
            <hr className="w-full mb-8 border-t border-serene-accent/10" />
          </div>
          {loading && (
            <div className="flex justify-center items-center mt-8">
              <Spinner />
              <p className="text-lg font-sans text-serene-accent ml-4 animate-pulse">
                Consulting the ancient verses...
              </p>
            </div>
          )}
          {synopsis && <SynopsisCard synopsis={synopsis} />}
          <PageNavigation />
        </>
      )}
    </>
  )
}

export default DohaQueryPage
