import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    favoriteColor: '',
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    console.log('User signed up: ', form)
    navigate('/posts');
  }

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <input 
          type="text" 
          placeholder="Username" 
          value={form.username} 
          onChange={(e) => setForm({...form, username: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={(e) => setForm({...form, password: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="First Name" 
          value={form.firstName} 
          onChange={(e) => setForm({...form, firstName: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={form.lastName} 
          onChange={(e) => setForm({...form, lastName: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={(e) => setForm({...form, email: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Favorite Color" 
          value={form.favoriteColor} 
          onChange={(e) => setForm({...form, favoriteColor: e.target.value})} 
        />
        <button onClick={handleSubmit}>Signup</button>
      </form>
    </div>
  )
}
