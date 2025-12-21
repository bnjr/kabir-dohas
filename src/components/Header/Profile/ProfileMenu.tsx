import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import useOutsideClick from '@/hooks/useOutsideClick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const ProfileMenu: React.FC = () => {
  const profileMenuRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  useOutsideClick(profileMenuRef, () => {
    setIsOpen(false)
  })

  const closeMenu = () => {
    setIsOpen(false)
  }
  const { signIn, signOutUser } = useAuth()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-serene-text hover:text-serene-accent transition-colors duration-300'
      >
        {user && user.photoURL ? (
          <Image
            src={user.photoURL}
            alt='Profile'
            width={30}
            height={30}
            className='w-8 h-8 rounded-full border-2 border-serene-accent/20'
          />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} size='xl' />
        )}
      </button>
      {isOpen && (
        <nav
          ref={profileMenuRef}
          className='absolute top-14 right-4 serene-card bg-white/95 w-56 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300'
        >
          <ul className='flex flex-col py-2'>
            {user ? (
              <>
                <li className='px-6 py-4 border-b border-serene-accent/5'>
                  <p className='text-xs uppercase tracking-widest text-serene-muted font-bold mb-1'>Signed in as</p>
                  <p className='text-sm font-sans font-semibold text-serene-text truncate'>{user.displayName || user.email}</p>
                </li>
                <li>
                  <Link href='/favorites'>
                    <div
                      className='px-6 py-4 cursor-pointer hover:bg-serene-accent/5 text-serene-text hover:text-serene-accent transition-colors duration-200 font-sans font-medium'
                      onClick={closeMenu}
                    >
                      My Journey (Favorites)
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    className='px-6 py-4 cursor-pointer hover:bg-serene-accent/5 text-serene-text hover:text-serene-accent transition-colors duration-200 font-sans font-medium'
                    onClick={() => {
                      signOutUser()
                      closeMenu()
                    }}
                  >
                    Set Out (Sign Out)
                  </div>
                </li>
              </>
            ) : (
              <li>
                <div
                  className='px-6 py-4 cursor-pointer hover:bg-serene-accent/5 text-serene-text hover:text-serene-accent transition-colors duration-200 font-sans font-medium flex items-center'
                  onClick={() => {
                    signIn()
                    closeMenu()
                  }}
                >
                  Embark (Sign In)
                </div>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}

export default ProfileMenu
