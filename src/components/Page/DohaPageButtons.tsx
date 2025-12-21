import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faLeaf } from '@fortawesome/free-solid-svg-icons'

type DohaPageButtonsProps = {}

const DohaPageButtons: React.FC<DohaPageButtonsProps> = () => {
  return (
    <div className='flex flex-wrap justify-center gap-6 mt-12 mb-8'>
      <Link href='/dohas'>
        <div className='serene-glass text-serene-accent font-sans font-semibold py-3 px-8 rounded-2xl cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-300 border-2 border-serene-accent/40 flex items-center gap-3'>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>Browse Collections</span>
        </div>
      </Link>
      <Link href='/?randomDoha=true'>
        <div className='bg-serene-accent text-white font-sans font-semibold py-3 px-8 rounded-2xl hover:bg-serene-accent/90 hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-3'>
          <FontAwesomeIcon icon={faLeaf} className="text-white/90" />
          <span>Seek Wisdom</span>
        </div>
      </Link>
    </div>
  )
}

export default DohaPageButtons
