import DohaDisplayRandom from '../components/DohaDisplayRandom'
import SEOHead from '../components/SEOHead'
import useRandomDoha from '@/hooks/useRandomDoha'

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
        <DohaDisplayRandom
          dohaData={dohaData}
          loading={loading}
          fetchRandomDoha={fetchRandomDoha}
        />
      )}
    </>
  )
}

export default Home
