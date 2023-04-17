import {useState, useEffect, useRef} from 'react'
import {DohaData} from '@/types/types'
import SEOHead from '@/components/SEO/SEOHead'
import Doha from '@/components/Doha/Doha'
import DohasPageButtons from '@/components/Page/DohasPageButtons'
import useWindowHeight from '@/hooks/useWindowHeight'
import DohaSkeleton from '@/components/Doha/DohaSkeleton'

const DohasPage = () => {
  const [dohas, setDohas] = useState<DohaData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const windowHeight = useWindowHeight()
  const initialLoad = useRef(true)

  // Set an approximate height for each doha card and header
  const dohaCardHeight = 200
  const headerHeight = 100
  const itemsPerPage = Math.floor(
    (windowHeight - headerHeight) / dohaCardHeight
  )

  const fetchDohas = async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/dohas?page=${page}&limit=${itemsPerPage}`
      )
      const data: DohaData[] = await response.json()
      if (Array.isArray(data)) {
        setDohas((prevDohas) => [...prevDohas, ...data])
      } else {
        console.error('Error: Expected an array, but received:', data)
      }
    } catch (error) {
      console.error('Error fetching dohas:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (initialLoad.current) {
      fetchDohas(currentPage)
      initialLoad.current = false
    }
  }, [windowHeight])

  const fetchMoreDohas = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1
      fetchDohas(newPage)
      return newPage
    })
  }

  // Create an array of DohaSkeleton components
  const skeletons = Array.from({length: itemsPerPage}, (_, i) => (
    <DohaSkeleton key={i} />
  ))

  return (
    <>
      <SEOHead title='All Dohas' description="Browse all of Kabir's Dohas." />
      <div className='mt-8'>
        {loading && initialLoad.current ? skeletons : null}
        {dohas.map((doha) => (
          <Doha key={doha.ID} dohaData={doha} loading={false} />
        ))}
        {loading && !initialLoad.current ? skeletons : null}
      </div>
      <DohasPageButtons fetchMoreDohas={fetchMoreDohas} />
    </>
  )
}

export default DohasPage
