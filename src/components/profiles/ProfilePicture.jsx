import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import './ProfilePicture.css'
export default function ProfilePicture({ initials, color}) {
  const navigate = useNavigate();
  const {user} = useContext(UserContext)

  return (
    <div className='profile-picture' style={{backgroundColor: color}} onClick={() => navigate(`/me`)} >
      {initials}
    </div>

  )
}
