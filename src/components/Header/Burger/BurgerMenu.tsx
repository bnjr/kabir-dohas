import React, {useState, useRef} from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import useOutsideClick from '../../../hooks/useOutsideClick'

const menuItems = [{label: 'About', href: '/about'}]

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useOutsideClick(menuRef, () => {
    setIsOpen(false)
  })

  const handleMenuItemClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-white hover:text-indigo-300'
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
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
    </>
  )
}

export default BurgerMenu
