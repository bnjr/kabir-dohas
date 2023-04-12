import {DohaData} from '../types/types'
import ShareButtons from './ShareButtons'
import DohaSkeleton from './DohaSkeleton'
interface DohaContentProps {
  dohaData: DohaData | null
  loading: boolean
}

const DohaContent: React.FC<DohaContentProps> = ({dohaData, loading}) => {
  if (loading) {
    return <DohaSkeleton />
  }
  return (
    dohaData && (
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full mb-8'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl font-semibold mb-4 text-indigo-700'>Doha</h1>
          <ShareButtons
            url={
              typeof window !== 'undefined'
                ? `${window.location.origin}/doha/${dohaData.ID}`
                : ''
            }
            title={`Kabir's Doha: ${dohaData.Doha}`}
            description={dohaData.EN}
          />
        </div>

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
      </div>
    )
  )
}

export default DohaContent
