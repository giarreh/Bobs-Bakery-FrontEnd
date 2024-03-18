import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <header className="header">
      <div>
        <div >LOGO</div>
      </div>
      <div>
        {user ? (
          <div className='headerLoggedIn'>
            <p>MY PROFILE</p>
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
