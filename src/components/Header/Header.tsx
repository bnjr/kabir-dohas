import React from 'react'
import Link from 'next/link'
import ProfileMenu from './Profile/ProfileMenu'
import BurgerMenu from './Burger/BurgerMenu'

const Header = () => {
  return (
    <header className='bg-transparent py-6 w-full max-w-3xl mx-auto'>
      <div className='relative'>
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
