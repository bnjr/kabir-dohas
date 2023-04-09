import Spinner from './Spinner1'

interface DohaData {
  Doha: string
  EN: string
  Meaning: string
}

interface DohaDisplayProps {
  dohaData: DohaData | null
  loading: boolean
  fetchDoha: () => Promise<void>
}

const DohaDisplay: React.FC<DohaDisplayProps> = ({
  dohaData,
  loading,
  fetchDoha,
}) => {
  return (
    dohaData && (
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full mb-8'>
        <h1 className='text-2xl font-semibold mb-4 text-indigo-700'>
          {"Kabir's Doha"}
        </h1>
        <div className='border-t border-b border-indigo-300 py-4 mb-4'>
          <p className='text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
            {dohaData.Doha}
          </p>
        </div>
        <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
          Translation
        </h2>
        <p className='mb-4 text-gray-800'>{dohaData.EN}</p>
        <h2 className='text-lg font-semibold mb-2 text-indigo-700'>Meaning</h2>
        <p className='text-gray-800'>{dohaData.Meaning}</p>
        <button
          className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
          onClick={fetchDoha}
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
    )
  )
}

export default DohaDisplay
