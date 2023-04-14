// src/hooks/useWindowHeight.ts
import {useState, useEffect} from 'react'

const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowHeight
}

export default useWindowHeight
