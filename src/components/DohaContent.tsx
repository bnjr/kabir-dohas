import {DohaData} from '../types/types'
import DohaContentSkeleton from './DohaContentSkeleton'
import DohaActions from './DohaActions'

interface DohaContentProps {
  dohaData: DohaData | null
  loading: boolean
}

const DohaContent: React.FC<DohaContentProps> = ({dohaData, loading}) => {
  if (loading) {
    return <DohaContentSkeleton />
  }
  return (
    dohaData && (
      <div className='bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full mb-8'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl font-semibold mb-4 text-indigo-700'>Doha</h1>
        </div>

        <div className='border-t border-b border-indigo-300 py-4 mb-4'>
          <p className='text-lg sm:text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
            {dohaData.Doha}
          </p>
        </div>
        <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
          Translation
        </h2>
        <p className='mb-4 text-gray-800'>{dohaData.EN}</p>
        <h2 className='text-lg font-semibold mb-2 text-indigo-700'>Meaning</h2>
        <p className='text-gray-800'>{dohaData.Meaning}</p>
        <DohaActions dohaData={dohaData} />
      </div>
    )
  )
}

export default DohaContent
