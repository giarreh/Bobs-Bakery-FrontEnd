import { useContext, createContext, useState } from "react"

export const UserContext = createContext()
export default function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

// Set the authentication token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Get the authentication token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Clear the authentication token from localStorage
const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('/api/user')
  //     .then((res) => res.json())
  //     .then((user) => {
  //       setUser(user);
  //       setLoading(false);
  //     });
  // }, []
  // );
  

  return (
    <UserContext.Provider value={{ user, setUser, setAuthToken, getAuthToken, clearAuthToken }}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  )
}
