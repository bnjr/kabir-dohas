import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '@/components/SEO/SEOHead'
import SynopsisCard from '@/components/Find/SynopsisCard'
import SearchPageLayout from '@/components/Layouts/SearchPageLayout'
import useFetchDohas from '@/hooks/useFetchDohas'

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
        <SearchPageLayout
          title="Seeking wisdom on..."
          subtitle="Ask a question or select a theme to explore Kabir's teachings."
          searchInput={searchInput}
          onSearchInputChange={handleSearchInputChange}
          onSearchSubmit={handleAskKabir}
          onChipClick={handleChipClick}
          loading={loading}
          loadingMessage="Consulting the ancient verses..."
        >
          {synopsis && <SynopsisCard synopsis={synopsis} />}
        </SearchPageLayout>
      )}
    </>
  )
}

export default DohaQueryPage

