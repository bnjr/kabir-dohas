import classNames from 'classnames'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface DohaSkeletonProps {
  details?: boolean
}

const DohaSkeleton: React.FC<DohaSkeletonProps> = ({details = false}) => {
  const cardClasses = classNames(
    'bg-white shadow-xl rounded-lg p-6 w-full mb-8',
    {
      'max-w-2xl': details,
      'max-w-sm mx-auto': !details,
    }
  )
  return (
    <div className={cardClasses}>
      {details ? (
        <>
          <div className='flex justify-between items-start'>
            <h1 className='text-2xl font-semibold mb-4 text-indigo-700'>
              Doha
            </h1>
          </div>

          <div className='border-t border-b border-indigo-300 py-4 mb-4'>
            <Skeleton height={20} count={2} />
          </div>
          <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
            Translation
          </h2>
          <Skeleton height={20} count={3} />
          <h2 className='text-lg font-semibold mb-2 text-indigo-700'>
            Meaning
          </h2>
          <Skeleton height={20} count={3} />
        </>
      ) : (
        <Skeleton height={20} count={2} />
      )}
    </div>
  )
}

export default DohaSkeleton
