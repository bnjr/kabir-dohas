import React from 'react'
import {User} from 'firebase/auth'
import {useAuth} from '@/context/AuthContext'

interface ProfileDropdownProps {
  user: User | null;
  closeDropdown: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = (props) => {
  const {signIn, signOutUser} = useAuth()
  const { user, closeDropdown } = props;
  return (
    <ul className='flex flex-col space-y-2 p-4'>
      {user ? (
        <>
          <li>
            <div
              className='cursor-pointer hover:text-indigo-700'
              onClick={() => {
                signOutUser();
                closeDropdown();
              }}            >
              Sign Out
            </div>
          </li>
        </>
      ) : (
        <li>
          <div
            className='cursor-pointer hover:text-indigo-700'
            onClick={() => {
              signIn();
              closeDropdown();
            }}          >
            Sign In with Google
          </div>
        </li>
      )}
    </ul>
  )
}

export default ProfileDropdown
