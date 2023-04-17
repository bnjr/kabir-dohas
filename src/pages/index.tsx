import SEOHead from '../components/SEO/SEOHead'
import useRandomDoha from '@/hooks/useRandomDoha'
import HomePageButtons from '@/components/Page/HomePageButtons'
import DohaDetails from '@/components/Doha/DohaDetails'

const Home = () => {
  const {dohaData, loading, error, fetchRandomDoha} = useRandomDoha()

  return (
    <>
      <SEOHead />
      {error ? (
        <div className='text-red-500 text-center my-4'>
          An error occurred: {error}
        </div>
      ) : (
        <DohaDetails dohaData={dohaData} loading={loading} />
      )}
      <HomePageButtons fetchRandomDoha={fetchRandomDoha} />
    </>
  )
}

export default Home
