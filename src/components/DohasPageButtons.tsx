import React from 'react'
import Link from 'next/link'

interface DohasPageButtonsProps {
  fetchMoreDohas: () => void
}

const DohasPageButtons: React.FC<DohasPageButtonsProps> = ({fetchMoreDohas}) => {
  return (
    <div className='flex justify-center mt-8'>
      <button
        className='mr-4 bg-indigo-400 text-white rounded px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
        onClick={fetchMoreDohas}
      >
        Get More Dohas
      </button>
      <Link href='/'>
        <div className='bg-indigo-400 text-white rounded px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
        Get A Random Doha
        </div>
      </Link>
    </div>
  )
}

export default DohasPageButtons
