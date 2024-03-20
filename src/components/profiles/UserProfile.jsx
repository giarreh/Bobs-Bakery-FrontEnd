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
          <p>Name: {user.firstname} {user.lastname}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => console.log(user)}>Get user</button>
        </div>
      :
        <p>Loading..</p>
      }
    </div>
  )
}
