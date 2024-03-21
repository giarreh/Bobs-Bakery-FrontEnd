import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
export default function ProfilePicture({ initials, color}) {
  return (
    <div className='profile-picture-post' style={{backgroundColor: color}}>
      {initials}
    </div>

  )
}
