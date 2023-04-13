import {DohaData} from '../types/types'
import DohaContent from './DohaContent'
import Spinner from './Spinner'

interface DohaDisplayProps {
  dohaData: DohaData | null
  loading: boolean
  fetchRandomDoha: () => Promise<void>
}

const DohaDisplayRandom: React.FC<DohaDisplayProps> = ({
  dohaData,
  loading,
  fetchRandomDoha,
}) => {
  return (
    <>
      <DohaContent dohaData={dohaData} loading={loading} />
      <div className='flex justify-center'>
        <button
          className='mt-4 w-auto px-4 py-2 bg-indigo-400 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          onClick={fetchRandomDoha}
          disabled={loading}
        >
          {loading ? (
            <div className='flex items-center'>
              <Spinner />
              <span className='ml-2'>Loading...</span>
            </div>
          ) : (
            'Get Another Doha'
          )}
        </button>
      </div>
    </>
  )
}

export default DohaDisplayRandom
