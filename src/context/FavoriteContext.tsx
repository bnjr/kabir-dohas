import React, { createContext, useContext, useState, useEffect } from 'react'
import { firestore } from '@/lib/firebaseConfig'
import { useAuth } from './AuthContext'
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
  increment,
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
  const { user } = useAuth()
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

  const updateFavoriteCount = async (
    dohaId: string,
    incrementValue: number
  ) => {
    const dohaViewRef = doc(firestore, 'dohaViews', String(dohaId))

    await setDoc(dohaViewRef, {
      dohaId: String(dohaId),
      favoriteCount: increment(incrementValue),
      // Set views to 0 if document is new, otherwise it won't be affected by set merge 
      // Actually views might exist, so we use merge
    }, { merge: true })
  }

  const toggleFavorite = async (dohaId: string) => {
    if (!user) return

    const isCurrentlyFavorite = !!favorites[dohaId]

    // 1. Optimistically update UI
    setFavorites((prev) => {
      const next = { ...prev }
      if (isCurrentlyFavorite) {
        delete next[dohaId]
      } else {
        next[dohaId] = true
      }
      return next
    })

    try {
      const favoritesRef = collection(firestore, 'favorites')

      if (isCurrentlyFavorite) {
        // Remove from favorite
        const favoriteQuery = query(
          favoritesRef,
          where('userId', '==', user.uid),
          where('dohaId', '==', dohaId)
        )
        const querySnapshot = await getDocs(favoriteQuery)

        const deletePromises = querySnapshot.docs.map((favDoc) =>
          deleteDoc(doc(firestore, 'favorites', favDoc.id))
        )
        await Promise.all(deletePromises)
        await updateFavoriteCount(dohaId, -1)
      } else {
        // Add to favorite
        await addDoc(favoritesRef, {
          userId: user.uid,
          dohaId: dohaId,
        })
        await updateFavoriteCount(dohaId, 1)
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      // 2. Rollback on failure
      setFavorites((prev) => {
        const next = { ...prev }
        if (isCurrentlyFavorite) {
          next[dohaId] = true
        } else {
          delete next[dohaId]
        }
        return next
      })
      // Optional: Add a toast notification here to inform the user
    }
  }

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}
