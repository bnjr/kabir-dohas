import React from 'react'
import Link from 'next/link'

type HomePageButtonsProps = {
  fetchRandomDoha: () => void
}

const HomePageButtons: React.FC<HomePageButtonsProps> = ({fetchRandomDoha}) => {
  return (
    <div className='flex justify-center mt-8 mb-4 space-x-4'>
      <Link href='/dohas'>
        <div className='bg-indigo-400 text-white py-2 px-4 rounded cursor-pointer hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
          Browse all Dohas
        </div>
      </Link>
      <button
        onClick={fetchRandomDoha}
        className='bg-indigo-400 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
      >
        Get A Random Doha
      </button>
    </div>
  )
}

export default HomePageButtons
