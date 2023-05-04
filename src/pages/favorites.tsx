import React, {useEffect, useState} from 'react'
import {useAuth} from '@/context/AuthContext'
import {DohaData} from '@/types/types'
import Doha from '@/components/Doha/Doha'
import {useFavorite} from '@/context/FavoriteContext'
import Spinner from '@/components/Utils/Spinner'

const fetchDohaById = async (id: string): Promise<DohaData> => {
  const response = await fetch(`/api/doha/${id}`)
  const dohaData = await response.json()
  return dohaData
}

const Favorites: React.FC = () => {
  const {user} = useAuth()
  const [favoriteDohas, setFavoriteDohas] = useState<DohaData[]>([])
  const {favorites} = useFavorite()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true)
        const favoriteDohasPromises: Promise<DohaData>[] = []
        Object.keys(favorites).forEach((dohaId) => {
          favorites[dohaId] && favoriteDohasPromises.push(fetchDohaById(dohaId))
        })

        const favoriteDohas = await Promise.all(favoriteDohasPromises)
        setFavoriteDohas(favoriteDohas)
        setLoading(false)
      }

      fetchData()
    }
  }, [user, favorites])

  const signInPrompt = (
    <div className='text-center'>
      <p className='text-xl font-semibold text-gray-700 mt-4'>
        Please sign in to view your favorites.
      </p>
    </div>
  )
  return (
    <div>
      {!user ? (
        signInPrompt
      ) : loading ? (
        <div className='flex justify-center items-center mt-4'>
          <Spinner />
          <p className='text-xl font-semibold text-gray-700 ml-4'>Loading...</p>
        </div>
      ) : favoriteDohas.length === 0 ? (
        <p className='text-xl font-semibold text-gray-700 mt-4 text-center'>
          No favorites found.
        </p>
      ) : (
        favoriteDohas.map((doha) => (
          <Doha key={doha.id} dohaData={doha} loading={false} />
        ))
      )}
    </div>
  )
}

export default Favorites
