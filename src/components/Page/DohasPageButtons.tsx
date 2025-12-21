import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLeaf, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface DohasPageButtonsProps {
  fetchMoreDohas: () => void
}

const DohasPageButtons: React.FC<DohasPageButtonsProps> = ({
  fetchMoreDohas,
}) => {
  const router = useRouter()

  return (
    <div className='flex flex-wrap justify-center gap-4 mt-12 mb-8 px-4'>
      <Link href='/'>
        <div className='serene-glass text-serene-accent font-sans font-semibold py-3 px-6 rounded-2xl cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-300 border-2 border-serene-accent/40 flex items-center gap-3'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </div>
      </Link>
      <button
        className='serene-glass text-serene-accent font-sans font-semibold py-3 px-6 rounded-2xl cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-300 border-2 border-serene-accent/40 flex items-center gap-3'
        onClick={fetchMoreDohas}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Expand Collection</span>
      </button>
      <button
        className='bg-serene-accent text-white font-sans font-semibold py-3 px-6 rounded-2xl hover:bg-serene-accent/90 hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-3'
        onClick={() => router.push(`/?randomDoha=true&t=${Date.now()}`)}
      >
        <FontAwesomeIcon icon={faLeaf} className="text-white/90" />
        <span>Receive a Doha</span>
      </button>
    </div>
  )
}

export default DohasPageButtons
