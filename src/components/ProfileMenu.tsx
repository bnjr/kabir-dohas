import React, {useRef, useState} from 'react'
import {useAuth} from '@/context/AuthContext'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

const ProfileMenu: React.FC = () => {
  const profileMenuRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useAuth()

  useOutsideClick(profileMenuRef, () => {
    setIsOpen(false)
  })

  const closeMenu = () => {
    setIsOpen(false)
  }
  const {signIn, signOutUser} = useAuth()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
      {isOpen && (
        <nav
          ref={profileMenuRef}
          className='absolute top-12 right-0 bg-white shadow-md rounded-lg text-black w-48 z-10'
        >
          <ul className='flex flex-col space-y-2 p-4'>
            {user ? (
              <>
                <li>
                  <Link href='/favorites'>
                    <div
                      className='cursor-pointer hover:text-indigo-700'
                      onClick={closeMenu}
                    >
                      My Favorites
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    className='cursor-pointer hover:text-indigo-700'
                    onClick={() => {
                      signOutUser()
                      closeMenu()
                    }}
                  >
                    Sign Out
                  </div>
                </li>
              </>
            ) : (
              <li>
                <div
                  className='cursor-pointer hover:text-indigo-700'
                  onClick={() => {
                    signIn()
                    closeMenu()
                  }}
                >
                  Sign In with Google
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
