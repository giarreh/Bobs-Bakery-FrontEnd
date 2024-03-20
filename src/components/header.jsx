import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Bobs_Bakery.svg';
import ProfilePicture from './profiles/ProfilePicture';

function Header() {
  const { user, setUser, clearAuthToken } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
          <img src={logo} alt="Bobs Bakery" width={32 * 5} height={16 * 5} />
        </div>
      </div>
      <div>
        {user ? (
          <div className='headerLoggedIn'>
            <ProfilePicture initials={(user.firstname && user.firstname[0]) + (user.lastname && user.lastname[0])} color={user?.favoritecolor} />
            <p>|</p>
            <p style={{ cursor: 'pointer' }} onClick={() => { setUser(null); clearAuthToken(); }}>LOGOUT</p>
          </div>
        ) : (
          <div>
            <p>LOGIN</p>
            <p>REGISTER</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
