import {DohaData} from '../types/types'
import ShareButtons from './ShareButtons'
import DohaSkeleton from './DohaSkeleton'
import Link from 'next/link'
interface DohaProps {
  dohaData: DohaData | null
  loading: boolean
}

const Doha: React.FC<DohaProps> = ({dohaData, loading}) => {
  if (loading) {
    return <DohaSkeleton />
  }
  return (
    dohaData && (
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full mb-8'>
        <div className='flex justify-between items-start'>
          <Link key={dohaData.ID} href={`/doha/${dohaData.ID}`}>
            <p className='text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
              {dohaData.Doha}
            </p>
          </Link>

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
      </div>
    )
  )
}

export default Doha
