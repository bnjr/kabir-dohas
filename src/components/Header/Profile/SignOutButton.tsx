import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const SignOutButton: React.FC = () => {
  const { signOutUser } = useAuth()

  return (
    <button onClick={signOutUser} className='bg-serene-muted/20 text-serene-text font-sans font-medium py-2 px-6 rounded-xl hover:bg-serene-muted/30 transition-all duration-300'>
      Sign Out
    </button>
  )
}

export default SignOutButton
