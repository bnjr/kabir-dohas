import React from 'react'
import Link from 'next/link'
import ProfileMenu from './Profile/ProfileMenu'
import BurgerMenu from './Burger/BurgerMenu'

const Header = () => {
  return (
    <header className='bg-indigo-700 text-white shadow-md mx-auto px-4 py-2 w-full max-w-2xl'>
      <div className='relative'>
        <div className='flex justify-between items-center'>
          <BurgerMenu />
          <div className='text-2xl font-semibold'>
            <Link href='/'>
              <div className='cursor-pointer'>{"Kabir's"} Dohas</div>
            </Link>
          </div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
