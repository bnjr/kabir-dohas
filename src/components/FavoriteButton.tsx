import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as faSolidHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faRegularHeart} from '@fortawesome/free-regular-svg-icons'
import {useFavorite} from '@/context/FavoriteContext'
import {useAuth} from '@/context/AuthContext'

interface FavoriteButtonProps {
  dohaId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({dohaId}) => {
  const {favorites, toggleFavorite} = useFavorite()
  const isFavorite = favorites[dohaId]
  const {user} = useAuth()
  const [showMessage, setShowMessage] = useState(false)

  const handleToggleFavorite = async () => {
    await toggleFavorite(dohaId)
  }

  const handleClick = async () => {
    if (user) {
      await handleToggleFavorite()
    } else {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000) // Hide the message after 3 seconds
    }
  }
  return (
    <div className='relative'>
      <button onClick={handleClick}>
        <FontAwesomeIcon
          icon={isFavorite ? faSolidHeart : faRegularHeart}
          className={isFavorite ? 'text-red-500' : 'text-black'}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          size='xl'
        />
      </button>
      {showMessage && (
        <div className='absolute top-full left-0 mt-1 p-2 rounded bg-red-500 text-white text-xs'>
          Sign in to add favorites
        </div>
      )}
    </div>
  )
}

export default FavoriteButton
