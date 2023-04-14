import React from 'react'
import Link from 'next/link'

type DohaPageButtonsProps = {}

const DohaPageButtons: React.FC<DohaPageButtonsProps> = () => {
  return (
    <div className='flex justify-center mt-8 space-x-4'>
      <Link href='/dohas'>
        <div className='bg-indigo-400 text-white py-2 px-4 rounded cursor-pointer hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
          Browse all Dohas
        </div>
      </Link>
      <Link href='/'>
        <div className='bg-indigo-400 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
          Get A Random Doha
        </div>
      </Link>
    </div>
  )
}

export default DohaPageButtons
