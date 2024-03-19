// Login.js

import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const { user, setUser, setAuthToken } = useContext(UserContext);
  const [userForm, setUserForm] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();


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
      setUser(data);
      setAuthToken(data.token);
      console.log("USER: ", user)
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
          placeholder='username'
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
        <p>Don't have an account? <a href="/#/signup">Sign up</a></p>
      </div>
    </div>
  )
}
