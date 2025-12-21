import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faLeaf } from '@fortawesome/free-solid-svg-icons'

type HomePageButtonsProps = {
  fetchRandomDoha: () => void
}

const HomePageButtons: React.FC<HomePageButtonsProps> = ({ fetchRandomDoha }) => {
  return (
    <div className='flex flex-wrap justify-center gap-6 mt-12 mb-8'>
      <Link href='/dohas'>
        <div className='serene-glass text-serene-accent font-sans font-semibold py-3 px-8 rounded-2xl cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-300 border-2 border-serene-accent/40 flex items-center gap-3'>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>Browse Collections</span>
        </div>
      </Link>
      <button
        onClick={fetchRandomDoha}
        className='bg-serene-accent text-white font-sans font-semibold py-3 px-8 rounded-2xl hover:bg-serene-accent/90 hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-3'
      >
        <FontAwesomeIcon icon={faLeaf} className="text-white/90" />
        <span>Receive a Doha</span>
      </button>
    </div>
  )
}

export default HomePageButtons
