import { useState, useEffect } from 'react'
import {
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { firestore } from '@/lib/firebaseConfig'

const useDohaViews = (dohaId: string) => {
  const [views, setViews] = useState<number | null>(null)
  const [favoriteCount, setFavoriteCount] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!dohaId) return

    const fetchViews = () => {
      try {
        const dohaViewRef = doc(firestore, 'dohaViews', String(dohaId))

        const unsubscribe = onSnapshot(
          dohaViewRef,
          (docSnapshot: any) => {
            if (docSnapshot.exists()) {
              const docData = docSnapshot.data()
              setViews(docData.views || 0)
              setFavoriteCount(docData.favoriteCount || 0)
            } else {
              setViews(0)
              setFavoriteCount(0)
            }
            setLoading(false)
          },
          (err: any) => {
            setError(err.message)
            setLoading(false)
          }
        )

        return unsubscribe
      } catch (err) {
        setError((err as Error).message)
        setLoading(false)
      }
    }

    const unsubscribe = fetchViews()
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [dohaId])

  return { views, favoriteCount, loading, error }
}

export default useDohaViews
