import {useState, useEffect} from 'react'
import {collection, getDocs, query, where} from 'firebase/firestore'
import {firestore} from '@/lib/firebaseConfig'

const useDohaViews = (dohaId: string) => {
  const [views, setViews] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const viewsRef = collection(firestore, 'dohaViews')
        const viewsQuery = query(
          viewsRef,
          where('dohaId', '==', dohaId)
        )
        const querySnapshot = await getDocs(viewsQuery)

        if (!querySnapshot.empty) {
          setViews(querySnapshot.docs[0].data().views)
        } else {
          setViews(0)
        }
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    if (dohaId) {
      fetchViews()
    }
  }, [dohaId])

  return {views, loading, error}
}

export default useDohaViews
