import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import useOutsideClick from '../../../hooks/useOutsideClick'

const menuItems = [{ label: 'About', href: '/about' }]

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)

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
        className='text-serene-text hover:text-serene-accent transition-colors duration-300'
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      {isOpen && (
        <nav
          ref={menuRef}
          className='absolute top-14 left-4 serene-card bg-white/95 w-56 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300'
        >
          <ul className='flex flex-col py-2'>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className='px-6 py-4 cursor-pointer hover:bg-serene-accent/5 text-serene-text hover:text-serene-accent transition-colors duration-200 font-sans font-medium'
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
