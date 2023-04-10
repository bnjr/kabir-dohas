// components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='w-full'>
      <div className='text-white mx-auto px-4 py-2 flex flex-col justify-center items-center w-full max-w-2xl'>
        {' '}
        {/* Removed bg-indigo-500 and shadow-md */}
        <div className='text-sm mb-2'>
          &copy; {new Date().getFullYear()} {"Kabir's"} Dohas. All rights
          reserved.
        </div>
        <div className='text-xs'>
          Content shared under{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-indigo-300'
          >
            Creative Commons Attribution 4.0 International License
          </a>
          .
        </div>
      </div>
    </footer>
  )
}

export default Footer
