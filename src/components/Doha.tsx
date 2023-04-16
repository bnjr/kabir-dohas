import {DohaData} from '../types/types'
import DohaSkeleton from './DohaSkeleton'
import Link from 'next/link'
import DohaActions from './DohaActions'
interface DohaProps {
  dohaData: DohaData
  loading: boolean
}

const Doha: React.FC<DohaProps> = ({dohaData, loading}) => {
  if (loading) {
    return <DohaSkeleton />
  }
  return (
    dohaData && (
      <div className='bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full mb-8'>
        <div className='flex justify-between items-start'>
          <Link key={dohaData.ID} href={`/doha/${dohaData.ID}`}>
            <div className='text-lg sm:text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
              {dohaData.Doha}
            </div>
          </Link>
        </div>
        <DohaActions dohaData={dohaData} />
      </div>
    )
  )
}

export default Doha
