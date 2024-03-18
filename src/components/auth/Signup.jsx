// Signup.js

import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { SketchPicker } from 'react-color';

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    favoriteColor: '',
  });

  const [color, setColor] = useState('#ffffff'); // State for the selected color
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setForm({ ...form, favoriteColor: newColor.hex }); // Update form state with new color
  };
  const [showColorPicker, setShowColorPicker] = useState(false); // State for showing/hiding the color picker
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    console.log('User signed up: ', form);
    navigate('/posts');
  };

  return (
    <div className="signup-container">
      <h1>Register a new user</h1>
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
        <div>
          <label htmlFor="color">Favorite Color</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setForm({ ...form, favoriteColor: e.target.value })}
          />
        </div>
        <button onClick={toggleColorPicker}>Pick a color</button>
        {showColorPicker && ( // Show color picker if showColorPicker is true
          <SketchPicker color={color} onChange={handleColorChange} />
        )}
        <button onClick={handleSubmit}>Sign up</button>
        <button onClick={() => {setUser(true); navigate('/posts')}}>TEST USER</button>
      </form>
    </div>
  );
}
