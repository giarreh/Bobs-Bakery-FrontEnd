import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import ProfileInitials from '../utils/ProfileInitials';

export default function UserProfile() {

  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? 
        <div>
          <h1>Profile</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      :
        <p>Loading..</p>
      }
    </div>
  )
}
