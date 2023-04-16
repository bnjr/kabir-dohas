import SEOHead from '../components/SEOHead'
import useRandomDoha from '@/hooks/useRandomDoha'
import HomePageButtons from '@/components/HomePageButtons'
import DohaContent from '@/components/DohaContent'

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
        <DohaContent dohaData={dohaData} loading={loading} />
      )}
      <HomePageButtons fetchRandomDoha={fetchRandomDoha} />
    </>
  )
}

export default Home
