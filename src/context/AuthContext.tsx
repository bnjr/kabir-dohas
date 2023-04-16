import React, {createContext, useContext, useEffect, useState} from 'react'
import {onAuthStateChanged, User} from 'firebase/auth'
import {signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth'
import {auth} from '@/lib/firebaseConfig'

interface AuthContextProps {
  user: User | null
  loading: boolean
  signIn: () => void
  signOutUser: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error('Error during sign in:', error)
  }
}

const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error during sign out:', error)
  }
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signIn: signIn,
  signOutUser: signOutUser,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{user, loading, signIn, signOutUser}}>
      {children}
    </AuthContext.Provider>
  )
}
