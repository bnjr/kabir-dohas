// pages/doha/[id].tsx
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import SEOHead from '../../components/SEOHead'
import DohaDisplaySingle from '@/components/DohaDisplaySingle'
import {DohaData} from '../../types/types'

const DohaPage: React.FC = () => {
  const router = useRouter()
  const {id} = router.query

  const [dohaData, setDohaData] = useState<DohaData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchDoha(id as string)
    }
  }, [id])

  const fetchDoha = async (dohaId: string) => {
    setLoading(true)
    const response = await fetch(`/api/doha/${dohaId}`)
    const data: DohaData = await response.json()
    setDohaData(data)
    setLoading(false)
  }

  return (
    <>
      <SEOHead />
      {dohaData && <DohaDisplaySingle dohaData={dohaData} loading={loading} />}
    </>
  )
}

export default DohaPage
