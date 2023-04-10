import React, {useState, useRef, RefObject} from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

const menuItems = [
  {label: 'About', href: '/about'},
  {label: 'Contact Us', href: 'mailto:contact@kabirsdohas.com'},
]

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
  const menuRef = useRef(null)

  useOutsideClick(menuRef, () => {
    setIsOpen(false)
  })

  const handleMenuItemClick = () => {
    setIsOpen(false)
  }

  return (
    <header className='bg-indigo-700 text-white shadow-md mx-auto px-4 py-2 w-full max-w-2xl'>
      <div className='relative flex justify-between items-center'>
        <div className='text-2xl font-semibold'>
          <Link href='/'>
            <div className='cursor-pointer'>{"Kabir's"} Dohas</div>
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-white hover:text-indigo-300'
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {isOpen && (
          <nav
            ref={menuRef}
            className='absolute top-12 right-0 bg-white shadow-md rounded-lg text-black w-48'
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
