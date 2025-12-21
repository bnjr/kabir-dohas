// components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='w-full mt-12 bg-transparent pb-10'>
      <div className='text-serene-muted mx-auto px-4 py-6 flex flex-col justify-center items-center w-full max-w-3xl border-t border-serene-accent/10'>
        <div className='text-sm mb-3 font-sans'>
          &copy; {new Date().getFullYear()} Kabir Wisdom.
        </div>
        <div className='text-[10px] uppercase tracking-widest opacity-70 text-center max-w-md'>
          Content shared under{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-serene-accent transition-colors duration-300'
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
