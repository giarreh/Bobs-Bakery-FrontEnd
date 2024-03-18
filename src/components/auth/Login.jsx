// Login.js

import React from 'react';
import './Login.css';

export default function Login() {

  const handleSubmit = (e) => {
    // check if user exists in database
    // if user exists, navigate to /posts
    // check if password is correct
    // check if username is correct
    e.preventDefault();
    console.log('User logged in');
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account? <a href="/#/signup">Sign up</a></p>
      </div>
    </div>
  )
}
