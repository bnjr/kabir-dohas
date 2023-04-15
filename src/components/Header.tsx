import React, {useState, useRef, RefObject} from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '@/context/AuthContext'
import ProfileDropdown from './ProfileDropdown'

const menuItems = [{label: 'About', href: '/about'}]

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, callback])
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const menuRef = useRef(null)
  const profileDropdownRef = useRef(null)
  const {user} = useAuth()

  useOutsideClick(menuRef, () => {
    setIsOpen(false)
  })

  useOutsideClick(profileDropdownRef, () => {
    setProfileDropdownOpen(false)
  })

  const handleMenuItemClick = () => {
    setIsOpen(false)
  }

  return (
    <header className='bg-indigo-700 text-white shadow-md mx-auto px-4 py-2 w-full max-w-2xl'>
      <div className='relative'>
        <div className='flex justify-between items-center'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-white hover:text-indigo-300'
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className='text-2xl font-semibold'>
            <Link href='/'>
              <div className='cursor-pointer'>{"Kabir's"} Dohas</div>
            </Link>
          </div>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className='text-white hover:text-indigo-300'
          >
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt='Profile'
                className='w-8 h-8 rounded-full border-2 border-indigo-300'
              />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size='xl' />
            )}
          </button>
          {profileDropdownOpen && (
            <nav
              ref={profileDropdownRef}
              className='absolute top-12 right-0 bg-white shadow-md rounded-lg text-black w-48 z-10'
            >
              <ProfileDropdown
                user={user}
                closeDropdown={() => setProfileDropdownOpen(false)}
              />
            </nav>
          )}
        </div>
        {isOpen && (
          <nav
            ref={menuRef}
            className='absolute top-12 left-0 bg-white shadow-md rounded-lg text-black w-48 z-10'
          >
            <ul className='flex flex-col space-y-2 p-4'>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <div
                      className='cursor-pointer hover:text-indigo-700'
                      onClick={handleMenuItemClick}
                    >
                      {item.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
