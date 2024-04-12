import { GetServerSideProps } from 'next'
import { DohaData } from '@/types/types'
import SEOHead from '@/components/SEO/SEOHead'
import DohaPageButtons from '@/components/Page/DohaPageButtons'
import Doha from '@/components/Doha/Doha'

interface DohaPageProps {
  dohaData: DohaData
}

const DohaPage: React.FC<DohaPageProps> = ({ dohaData }) => {
  
  return (
    <>
      <SEOHead
        title={`Kabir's Doha: ${dohaData.doha_hi}`}
        description={`Read and understand Kabir's Doha: "${dohaData.doha_en}".`}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/doha/${dohaData.id}`}
      />
      {dohaData && <Doha dohaData={dohaData} loading={false} details />}
      <DohaPageButtons />
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
    console.log('get server page', {apiUrl})

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
