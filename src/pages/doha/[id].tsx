import { GetServerSideProps } from 'next'
import { DohaData } from '@/types/types'
import SEOHead from '@/components/SEO/SEOHead'
import PageNavigation from '@/components/Page/PageNavigation'
import Doha from '@/components/Doha/Doha'

interface DohaPageProps {
  dohaData: DohaData
}

const DohaPage: React.FC<DohaPageProps> = ({ dohaData }) => {
  return (
    <>
      <SEOHead
        title={`Kabir's Doha: ${dohaData.doha_hi}`}
        description={`Read and understand Kabir's Doha: "${dohaData.doha_en}". Meaning: ${dohaData.meaning_en}`}
        keywords={`Kabir, Doha, ${dohaData.doha_hi}, Translation, Meaning, Sant Kabir, Wisdom`}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/doha/${dohaData.id}`}
        type="doha"
        dohaData={dohaData}
      />
      {dohaData && <Doha dohaData={dohaData} loading={false} details />}
      <PageNavigation />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query
    const apiUrl = new URL(
      `/api/doha/${id}`,
      `http://${context.req.headers.host}`
    ).toString()

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Doha not found')
    }

    const dohaData: DohaData = await response.json()

    return {
      props: {
        dohaData,
      },
    }
  } catch (error) {
    console.error('error in api', error)
    return {
      notFound: true,
    }
  }
}

export default DohaPage
