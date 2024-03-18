import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div>
        <div >LOGO</div>
      </div>
      <div>
        {user ? (
          <div className='headerLoggedIn'>
            <p style={{ cursor: 'pointer' }} onClick={() => navigate('/me')} >MY PROFILE</p>
            <p>|</p>
            <p style={{ cursor: 'pointer' }} onClick={() => setUser(null)}>LOGOUT</p>
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
