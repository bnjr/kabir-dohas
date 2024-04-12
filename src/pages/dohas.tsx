import { useState, useEffect } from 'react'
import { DohaData } from '@/types/types'
import SEOHead from '@/components/SEO/SEOHead'
import Doha from '@/components/Doha/Doha'
import DohasPageButtons from '@/components/Page/DohasPageButtons'
import DohaSkeleton from '@/components/Doha/DohaSkeleton'
import useFetchDohas from '@/hooks/useFetchDohas'
import useDebouncedWindowHeight from '@/hooks/useDebouncedWindowHeight'

const DohasPage = () => {
  const [initialLoad, setInitialLoad] = useState(true)
  const [dohas, setDohas] = useState<DohaData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, error, fetchDohas } = useFetchDohas()
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const windowHeight = useDebouncedWindowHeight(200)

  // Set an approximate height for each doha card and header
  const DOHA_CARD_HEIGHT = 200
  const HEADER_HEIGHT = 100

  const loadDohas = async (page: number) => {
    const newDohas = await fetchDohas({ page, itemsPerPage })
    if (initialLoad) setDohas(() => [...(newDohas?.length ? newDohas : [])])
    else
      setDohas((prevDohas) => [
        ...prevDohas,
        ...(newDohas?.length ? newDohas : []),
      ])
  }

  const fetchMoreDohas = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1
      loadDohas(newPage)
      return newPage
    })
  }

  useEffect(() => {
    if (itemsPerPage > 0) {
      loadDohas(currentPage)
      setInitialLoad(false)
    }
  }, [itemsPerPage])

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
      <div className="mt-8">
        {loading && initialLoad ? skeletons : null}
        {dohas.map((doha) => (
          <Doha key={doha.id} dohaData={doha} loading={false} />
        ))}
        {loading && !initialLoad ? skeletons : null}
      </div>
      {error && (
        <div className="text-red-500 text-center my-4">
          An error occurred: {error}
        </div>
      )}
      <DohasPageButtons fetchMoreDohas={fetchMoreDohas} />
    </>
  )
}

export default DohasPage
