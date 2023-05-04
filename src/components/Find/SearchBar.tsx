import React from 'react'

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
    <form onSubmit={handleAskKabir} className='flex items-center w-full mb-4'>
      <input
        className='border border-gray-300 rounded-l px-2 py-2 mr-2 w-full focus:outline-none text-gray-700'
        type='text'
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button
        className='bg-blue-500 text-white font-bold py-2 px-4 rounded-r whitespace-nowrap'
        type='submit'
      >
        Ask Kabir
      </button>
    </form>
  )
}

export default SearchBar
