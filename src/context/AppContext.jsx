import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user){
      const fetchData = async () => {
        try {
          const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
          const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  
          const postsData = await postsResponse.json();
          const usersData = await usersResponse.json();
  
          setPosts(postsData);
          setUsers(usersData);
  
          console.log("POSTS ARE SET: ", postsData);
          console.log("USERS ARE SET: ", usersData);
        } catch (error) {
          throw new Error('Error fetching data');
        }
      };
  
      fetchData();
      console.log("USER UPDATED, REFETCHING DATA...")
    }
  }, [user]
  );

  return (
    <AppContext.Provider value={{ posts, users }}>
      {children}
    </AppContext.Provider>
  );
}
