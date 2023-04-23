import {useState, useEffect} from 'react'
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import {firestore} from '@/lib/firebaseConfig'

const useDohaViews = (dohaId: string) => {
  const [views, setViews] = useState<number | null>(null)
  const [favoriteCount, setFavoriteCount] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!dohaId) return

    const fetchViews = () => {
      try {
        const viewsRef = collection(firestore, 'dohaViews')
        const viewsQuery = query(viewsRef, where('dohaId', '==', dohaId))

        const unsubscribe = onSnapshot(
          viewsQuery,
          (querySnapshot) => {
            if (!querySnapshot.empty) {
              const docData = querySnapshot.docs[0].data()
              setViews(docData.views)
              setFavoriteCount(docData.favoriteCount)
            } else {
              setViews(0)
              setFavoriteCount(0)
            }
            setLoading(false)
          },
          (err) => {
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

  return {views, favoriteCount, loading, error}
}

export default useDohaViews
