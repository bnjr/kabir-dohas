// pages/doha/[id].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SEOHead from '../../components/SEOHead'
import DohaDisplaySingle from '@/components/DohaDisplaySingle'

interface DohaData {
  Doha: string
  EN: string
  Meaning: string
}

const DohaPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [dohaData, setDohaData] = useState<DohaData | null>(null)

  useEffect(() => {
    if (id) {
      fetchDoha(id as string)
    }
  }, [id])

  const fetchDoha = async (dohaId: string) => {
    const response = await fetch(`/api/doha/${dohaId}`)
    const data: DohaData = await response.json()
    setDohaData(data)
  }

  return (
    <>
      <SEOHead />
      {dohaData && <DohaDisplaySingle dohaData={dohaData} />}
    </>
  )
}

export default DohaPage
