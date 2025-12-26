import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProfileMenu from './Profile/ProfileMenu'
import BurgerMenu from './Burger/BurgerMenu'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 py-3 sm:py-6 w-full transition-all duration-300 border-b ${isScrolled
        ? 'bg-serene-bg/95 backdrop-blur-md shadow-sm border-serene-accent/10'
        : 'bg-transparent border-transparent'
        }`}
    >
      <div className='max-w-3xl mx-auto'>
        <div className='flex justify-between items-center px-4'>
          <BurgerMenu />
          <div className='text-3xl font-serif font-bold tracking-tight text-serene-text'>
            <Link href='/'>
              <div className='cursor-pointer'>Kabir</div>
            </Link>
          </div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
