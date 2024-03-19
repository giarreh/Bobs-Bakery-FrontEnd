import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

export default function PrivateRoutes() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true); 

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("TOKEN: ", token)
      console.log("DECODED TOKEN: ", decodedToken);
      setUser(decodedToken);
    }
    setLoading(false); 
  }, [token]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    user ? <Outlet /> : <Navigate to="/login" />
  );
}
