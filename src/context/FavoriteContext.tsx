import React, {createContext, useContext, useState, useEffect} from 'react'
import {firestore} from '@/lib/firebaseConfig'
import {useAuth} from './AuthContext'
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
  doc,
} from 'firebase/firestore'

type FavoriteContextType = {
  favorites: Record<string, boolean>
  setFavorites: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  toggleFavorite: (dohaId: string) => Promise<void>
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
)

export const useFavorite = () => {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider')
  }
  return context
}

interface FavoriteProviderProps {
  children: React.ReactNode
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({
  children,
}) => {
  const {user} = useAuth()
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favoritesRef = collection(firestore, 'favorites')
        const favoritesQuery = query(
          favoritesRef,
          where('userId', '==', user.uid)
        )
        const querySnapshot = await getDocs(favoritesQuery)

        const favoritesMap: Record<string, boolean> = {}
        querySnapshot.forEach((doc) => {
          const favorite = doc.data()
          favoritesMap[favorite.dohaId] = true
        })

        setFavorites(favoritesMap)
      }
    }
    fetchFavorites()
  }, [user])

  const toggleFavorite = async (dohaId: string) => {
    if (!user) {
      return
    }
    const favoritesRef = collection(firestore, 'favorites')

    if (favorites[dohaId]) {
      // Remove from favorite
      const favoriteQuery = query(
        favoritesRef,
        where('userId', '==', user.uid),
        where('dohaId', '==', dohaId)
      )
      const querySnapshot = await getDocs(favoriteQuery)

      querySnapshot.forEach(async (favDoc) => {
        await deleteDoc(doc(firestore, 'favorites', favDoc.id))
      })

      setFavorites((prevFavorites) => {
        const updatedFavorites = {...prevFavorites}
        delete updatedFavorites[dohaId]
        return updatedFavorites
      })
    } else {
      // Add to favorite
      await addDoc(favoritesRef, {
        userId: user.uid,
        dohaId: dohaId,
      })


      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [dohaId]: true,
      }))
    }
  }

  return (
    <FavoriteContext.Provider value={{favorites, setFavorites, toggleFavorite}}>
      {children}
    </FavoriteContext.Provider>
  )
}
