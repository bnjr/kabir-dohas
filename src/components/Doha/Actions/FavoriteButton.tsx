import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { useFavorite } from '@/context/FavoriteContext'
import { useAuth } from '@/context/AuthContext'

interface FavoriteButtonProps {
  dohaId: string
  favoriteCount: number
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  dohaId,
  favoriteCount,
}) => {
  const { favorites, toggleFavorite } = useFavorite()
  const isFavorite = favorites[dohaId]
  const { user } = useAuth()
  const [showMessage, setShowMessage] = useState(false)

  const handleToggleFavorite = async () => {
    await toggleFavorite(dohaId)
  }

  const handleClick = async () => {
    if (user) {
      await handleToggleFavorite()
    } else {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000) // Hide the message after 2 seconds
    }
  }
  return (
    <div className='relative'>
      <div className='flex items-center space-x-1'>
        <span className='text-xl text-gray-500'>{favoriteCount}</span>
        <button onClick={handleClick}>
          <FontAwesomeIcon
            icon={isFavorite ? faSolidHeart : faRegularHeart}
            className={isFavorite ? 'text-red-500' : 'text-gray-500'}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            size='xl'
          />
        </button>
      </div>
      {showMessage && (
        <div className='absolute top-full left-0 mt-3 p-3 rounded-xl bg-serene-accent text-white text-[10px] uppercase tracking-wider font-semibold shadow-lg z-10 whitespace-nowrap animate-in fade-in slide-in-from-top-2 duration-300'>
          Awaken to save your favorites
        </div>
      )}
    </div>
  )
}

export default FavoriteButton
