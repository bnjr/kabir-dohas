import React from 'react'
import {useAuth} from '../context/AuthContext'

const SignOutButton: React.FC = () => {
  const {signOutUser} = useAuth()

  return (
    <button onClick={signOutUser} className='btn btn-primary'>
      Sign Out
    </button>
  )
}

export default SignOutButton
