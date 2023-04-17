import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DohaSkeleton: React.FC = () => {
  return (
    <div className='bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full mb-8'>
      <Skeleton height={20} count={2} />
    </div>
  )
}

export default DohaSkeleton
