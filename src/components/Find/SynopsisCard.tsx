import React from 'react'

interface SynopsisProps {
  synopsis: string
}

const SynopsisCard: React.FC<SynopsisProps> = ({synopsis}) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 mx-auto mb-4 w-full'>
      <h2 className='text-xl text-indigo-700 font-bold mb-2'>
        {"Kabir's Thoughts"}
      </h2>
      <p className='text-gray-800'>{synopsis}</p>
    </div>
  )
}

export default SynopsisCard
