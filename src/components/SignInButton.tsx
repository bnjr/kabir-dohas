import React from 'react'
import {useAuth} from '../context/AuthContext'

const SignInButton: React.FC = () => {
  const {signIn} = useAuth()

  return (
    <button onClick={signIn} className='btn btn-primary'>
      Sign In with Google
    </button>
  )
}

export default SignInButton
