import { useContext, createContext, useState } from "react"
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext()
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

// Set the authentication token in localStorage
const setAuthToken = (token) => {
    return localStorage.setItem('authToken', token);
};

// Get the authentication token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const getUserFromToken = (token) => {
  const decodedToken = jwtDecode(token);
  console.log("DECODED TOKEN: ", decodedToken);
  return decodedToken;
};


// Clear the authentication token from localStorage
const clearAuthToken = () => {
  return localStorage.removeItem('authToken');
};
  return (
    <UserContext.Provider value={{ user, setUser, setAuthToken, getAuthToken, clearAuthToken,getUserFromToken }}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  )
}
