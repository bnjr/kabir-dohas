import classNames from 'classnames'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface DohaSkeletonProps {
  details?: boolean
}

const DohaSkeleton: React.FC<DohaSkeletonProps> = ({ details = false }) => {
  const cardClasses = classNames(
    'serene-card p-8 w-full mb-10 transition-all duration-500',
    {
      'max-w-3xl': details,
      'max-w-md mx-auto': !details,
    }
  )
  return (
    <div className={cardClasses}>
      {details ? (
        <>
          <div className='flex justify-between items-start mb-6'>
            <h1 className='text-sm uppercase tracking-widest font-sans font-semibold text-serene-accent/30'>
              <Skeleton width={100} />
            </h1>
          </div>

          <div className='border-y border-serene-accent/10 py-8 mb-8'>
            <Skeleton height={32} count={2} />
          </div>
          <div className="space-y-8">
            <section>
              <h2 className='text-xs uppercase tracking-widest font-sans font-bold mb-3 text-serene-accent/30'>
                <Skeleton width={80} />
              </h2>
              <Skeleton height={20} count={2} />
            </section>
            <section>
              <h2 className='text-xs uppercase tracking-widest font-sans font-bold mb-3 text-serene-accent/30'>
                <Skeleton width={100} />
              </h2>
              <Skeleton height={20} count={3} />
            </section>
          </div>
        </>
      ) : (
        <Skeleton height={24} count={3} />
      )}
    </div>
  )
}

export default DohaSkeleton
