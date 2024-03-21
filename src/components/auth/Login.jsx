// Login.js

import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {  
  const navigate = useNavigate();

  const { user, setUser, getAuthToken, setAuthToken, getUserFromToken } = useContext(UserContext);
  const [userForm, setUserForm] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userForm),
      });

      if (!response.ok) {
        return console.error('Unable to login:', response);
      }

      const data = await response.json();
      console.log(data);
      await setUser(data);
      await setAuthToken(data.token);
      navigate('/');
    } catch (error) {
      console.error('Unable to login:', error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
          type="text" required 
          value={userForm.username}
          placeholder='Username'
          onChange={(e) => setUserForm({...userForm, username: e.target.value})}
          />
        </div>
        <div>
          <input type="password" required
          value={userForm.password}
          placeholder='Password'
          onChange={(e) => setUserForm({...userForm, password: e.target.value})}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <div className='noAccount'>
        <p>Don't have an account?</p>
        <p onClick={() => navigate("/signup")} >Sign up</p>
        </div>
      </div>
    </div>
  )
}
