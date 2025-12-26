import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface SearchBarProps {
  searchInput: string
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAskKabir: (e: React.FormEvent<HTMLFormElement>) => void
  onChipClick?: (mood: string) => void
}

const MOODS = ['Peace', 'Love', 'Ego', 'Truth', 'Discipline', 'Surrender']

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  handleSearchInputChange,
  handleAskKabir,
  onChipClick,
}) => {
  return (
    <div className="w-full">
      <form onSubmit={handleAskKabir} className='flex flex-col sm:flex-row items-stretch sm:items-center w-full mb-4 gap-3 sm:gap-4 group'>
        <div className='relative flex-grow'>
          <input
            className='w-full bg-white/50 border-2 border-serene-accent/20 rounded-2xl px-6 py-4 focus:outline-none focus:border-serene-accent/50 focus:bg-white transition-all duration-300 text-serene-text placeholder-serene-muted shadow-sm text-lg'
            type='text'
            placeholder='Ask about life, peace, or truth...'
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <button
          className='bg-serene-accent hover:bg-serene-accent/90 text-white font-sans font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap flex items-center justify-center gap-3'
          type='submit'
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white/90" />
          <span>Seek Wisdom</span>
        </button>
      </form>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {MOODS.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => onChipClick?.(mood)}
            className="px-4 py-1.5 rounded-full bg-serene-accent/5 hover:bg-serene-accent/15 border border-serene-accent/10 text-serene-accent text-sm font-medium transition-colors duration-200"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
