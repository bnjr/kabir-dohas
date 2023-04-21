import React from 'react'
import {DohaData} from '../../types/types'
import DohaSkeleton from './DohaSkeleton'
import Link from 'next/link'
import DohaActions from './Actions/DohaActions'
import {useEffect} from 'react'
import {incrementDohaViews} from '@/lib/incrementDohaViews'

interface DohaProps {
  dohaData: DohaData | null
  loading: boolean
  details?: boolean
}

const DohaComponent: React.FC<DohaProps> = ({
  dohaData,
  loading,
  details = false,
}) => {
  useEffect(() => {
    const addView = async () => {
      if (!loading && dohaData) {
        await incrementDohaViews(dohaData.ID)
        console.log('Incrementing in Doha for: ', dohaData.ID)
      }
    }
    addView()
  }, [loading, dohaData])

  if (loading) {
    return <DohaSkeleton details />
  }

  return dohaData ? (
    <div className='bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full mb-8'>
      <div className='flex justify-between items-start'>
        {details ? (
          <>
            <h1 className='text-2xl font-semibold mb-4 text-indigo-700'>
              Doha
            </h1>
          </>
        ) : (
          <Link key={dohaData.ID} href={`/doha/${dohaData.ID}`}>
            <div className='text-lg sm:text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
              {dohaData.Doha}
            </div>
          </Link>
        )}
      </div>
      {details && (
        <>
          <div className='border-t border-b border-indigo-300 py-4 mb-4'>
            <p className='text-lg sm:text-xl font-semibold text-indigo-800 whitespace-pre-wrap'>
              {dohaData.Doha}
            </p>
          </div>
          <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
            Translation
          </h2>
          <p className='mb-4 text-gray-800'>{dohaData.EN}</p>
          <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
            Meaning
          </h2>
          <p className='text-gray-800'>{dohaData.Meaning}</p>
        </>
      )}
      <DohaActions dohaData={dohaData} />
    </div>
  ) : (
    <div className='text-red-500 text-center my-4'>No Doha to show</div>
  )
}

const Doha = React.memo(DohaComponent)
Doha.displayName = 'Doha'

export default Doha
