import React from 'react'
import {useRouter} from 'next/router'

interface DohasPageButtonsProps {
  fetchMoreDohas: () => void
}

const DohasPageButtons: React.FC<DohasPageButtonsProps> = ({
  fetchMoreDohas,
}) => {
  const router = useRouter()

  return (
    <div className='flex justify-center mt-8'>
      <button
        className='mr-4 bg-indigo-400 text-white rounded px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
        onClick={fetchMoreDohas}
      >
        Get More Dohas
      </button>
      <button
        className='bg-indigo-400 text-white rounded px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
        onClick={() => router.push('/?randomDoha=true')}
      >
        Get A Random Doha
      </button>
    </div>
  )
}

export default DohasPageButtons
