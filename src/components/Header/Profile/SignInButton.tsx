import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const SignInButton: React.FC = () => {
  const { signIn } = useAuth()

  return (
    <button onClick={signIn} className='bg-serene-accent text-white font-sans font-medium py-2 px-6 rounded-xl hover:bg-serene-accent/90 transition-all duration-300 shadow-sm'>
      Sign In
    </button>
  )
}

export default SignInButton
