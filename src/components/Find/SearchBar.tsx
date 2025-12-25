import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface SearchBarProps {
  searchInput: string
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAskKabir: (e: React.FormEvent<HTMLFormElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  handleSearchInputChange,
  handleAskKabir,
}) => {
  return (
    <form onSubmit={handleAskKabir} className='flex items-center w-full mb-6 group'>
      <div className='relative flex-grow'>
        <input
          className='w-full bg-white/50 border-2 border-serene-accent/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-serene-accent/50 focus:bg-white transition-all duration-300 text-serene-text placeholder-serene-muted shadow-sm'
          type='text'
          placeholder='Ask about life, peace, or truth...'
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <button
        className='ml-4 bg-serene-accent hover:bg-serene-accent/90 text-white font-sans font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap flex items-center gap-3'
        type='submit'
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white/90" />
        <span>Seek</span>
      </button>
    </form>
  )
}

export default SearchBar
