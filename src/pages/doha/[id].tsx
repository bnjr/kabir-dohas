import {GetServerSideProps} from 'next'
import {DohaData} from '../../types/types'
import SEOHead from '../../components/SEO/SEOHead'
import DohaPageButtons from '@/components/Page/DohaPageButtons'
import Doha from '@/components/Doha/Doha'

interface DohaPageProps {
  dohaData: DohaData
}

const DohaPage: React.FC<DohaPageProps> = ({dohaData}) => {

  return (
    <>
      <SEOHead
        title={`Kabir's Doha: ${dohaData.Doha}`}
        description={`Read and understand Kabir's Doha: "${dohaData.EN}".`}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/doha/${dohaData.ID}`}
      />
      {dohaData && <Doha dohaData={dohaData} loading={false} details/>}
      <DohaPageButtons />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const {id} = context.query
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const response = await fetch(`${apiUrl}/api/doha/${id}`)

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
    return {
      notFound: true,
    }
  }
}

export default DohaPage
