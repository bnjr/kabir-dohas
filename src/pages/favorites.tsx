import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { DohaData } from '@/types/types'
import Doha from '@/components/Doha/Doha'
import { useFavorite } from '@/context/FavoriteContext'
import Spinner from '@/components/Utils/Spinner'
import SEOHead from '@/components/SEO/SEOHead'

const fetchDohaById = async (id: string): Promise<DohaData> => {
  const response = await fetch(`/api/doha/${id}`)
  const dohaData = await response.json()
  return dohaData
}

const Favorites: React.FC = () => {
  const { user } = useAuth()
  const [favoriteDohas, setFavoriteDohas] = useState<DohaData[]>([])
  const { favorites } = useFavorite()
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
    <div className='flex flex-col items-center justify-center py-20 px-6 serene-card mx-auto max-w-md border border-serene-accent/5'>
      <p className='text-2xl font-serif font-semibold text-serene-text text-center'>
        The path is personal.
      </p>
      <p className='text-serene-muted mt-2 text-center'>
        Please sign in to keep your favorites.
      </p>
    </div>
  )
  return (
    <>
      <SEOHead
        title="Your Favorites - Kabir's Dohas"
        description="View and manage your collection of favorite Kabir dohas."
      />
      <div className="px-4">
        <h1 className="text-4xl font-serif font-bold text-serene-text mb-12 text-center">Your Collection</h1>
        {!user ? (
          signInPrompt
        ) : loading ? (
          <div className='flex justify-center items-center py-20'>
            <Spinner />
            <p className='text-lg font-sans text-serene-accent ml-4 animate-pulse'>Recalling your collection...</p>
          </div>
        ) : favoriteDohas.length === 0 ? (
          <div className="py-20 text-center">
            <p className='text-xl font-serif italic text-serene-muted'>
              Your journey is just beginning. Save wisdom to see it here.
            </p>
          </div>
        ) : (
          favoriteDohas.map((doha) => (
            <Doha key={doha.id} dohaData={doha} loading={false} />
          ))
        )}
      </div>
    </>
  )
}

export default Favorites
