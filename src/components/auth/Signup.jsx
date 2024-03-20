// Signup.js

import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { SketchPicker } from 'react-color';

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [color, setColor] = useState('#000000'); // State for color picker
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    favoriteColor: '',
    role: ['user']
  });

  const handleColorChange = (newColor) => {
    setForm({ ...form, favoriteColor: newColor.hex }); // Update form state with new color
    setColor(newColor.hex); // Update color state with new color
  };
  const [showColorPicker, setShowColorPicker] = useState(false); // State for showing/hiding the color picker
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // check if fields are empty
    if (form.username === '' || form.password === '' || form.firstName === '' || form.lastName === '' || form.email === '') {
      alert('Please fill in all fields');
      return;
    }

    


    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error('Unable to sign up');
      }
      console.log("USER: ",form)
      alert('User created successfully, redirecting to sign in page..');
      navigate('/login');
    } catch (error) {
      console.error('Unable to sign up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Register a new user</h1>
      <div>
      <form className="signup-form">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {showColorPicker && (
          <>
          <SketchPicker color={color} onChange={handleColorChange} />
          <input
          type="text"
          id="favoriteColor"
          value={color}
          onChange={(e) => {setForm({ ...form, favoriteColor: e.target.value });}}/>
          </> // Show color picker if showColorPicker is true
        )}
        <div className='buttonsSignup'>
          <button type='button' onClick={toggleColorPicker}>{!showColorPicker ? 'Select a color' : 'Confirm'}</button>
          <button onClick={handleSubmit}>Sign up</button>
        </div>
      </form>
      </div>
    </div>
  );
}
