import { useState, useEffect, useRef, useCallback } from 'react'
import { DohaData } from '@/types/types'
import SEOHead from '@/components/SEO/SEOHead'
import Doha from '@/components/Doha/Doha'
import PageNavigation from '@/components/Page/PageNavigation'
import DohaSkeleton from '@/components/Doha/DohaSkeleton'
import useFetchDohas from '@/hooks/useFetchDohas'
import useDebouncedWindowHeight from '@/hooks/useDebouncedWindowHeight'

const DohasPage = () => {
  const [dohas, setDohas] = useState<DohaData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, error, fetchDohas } = useFetchDohas()
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const windowHeight = useDebouncedWindowHeight(200)
  const hasInitiallyLoaded = useRef(false)

  // Set an approximate height for each doha card and header
  const DOHA_CARD_HEIGHT = 200
  const HEADER_HEIGHT = 100

  const loadDohas = useCallback(async (page: number, limit: number, isInitial: boolean) => {
    const newDohas = await fetchDohas({ page, itemsPerPage: limit })
    if (isInitial) {
      setDohas(newDohas?.length ? newDohas : [])
    } else {
      setDohas((prevDohas) => [
        ...prevDohas,
        ...(newDohas?.length ? newDohas : []),
      ])
    }
  }, [fetchDohas])

  const fetchMoreDohas = useCallback(() => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    loadDohas(nextPage, itemsPerPage, false)
  }, [currentPage, itemsPerPage, loadDohas])

  useEffect(() => {
    if (itemsPerPage > 0 && !hasInitiallyLoaded.current) {
      hasInitiallyLoaded.current = true
      loadDohas(1, itemsPerPage, true)
    }
  }, [itemsPerPage, loadDohas])

  useEffect(() => {
    if (windowHeight !== null) {
      setItemsPerPage(
        Math.floor((windowHeight - HEADER_HEIGHT) / DOHA_CARD_HEIGHT)
      )
    }
  }, [windowHeight])

  // Create an array of DohaSkeleton components
  const skeletons = Array.from({ length: itemsPerPage }, (_, i) => (
    <DohaSkeleton key={i} />
  ))

  return (
    <>
      <SEOHead title="All Dohas" description="Browse all of Kabir's Dohas." />
      <div className="mt-8 px-4">
        <h1 className="text-4xl font-serif font-bold text-serene-text mb-12 text-center">The Collection</h1>
        {loading && !hasInitiallyLoaded.current ? skeletons : null}
        {dohas.map((doha) => (
          <Doha key={doha.id} dohaData={doha} loading={false} />
        ))}
        {loading && hasInitiallyLoaded.current ? skeletons : null}
      </div>
      {error && (
        <div className="text-red-500 text-center my-4">
          An error occurred: {error}
        </div>
      )}
      <PageNavigation
        showExpandCollection
        onExpandCollection={fetchMoreDohas}
        showBrowseCollections={false}
      />
    </>
  )
}

export default DohasPage
