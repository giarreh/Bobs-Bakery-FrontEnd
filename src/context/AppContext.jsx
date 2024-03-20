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
          const postsResponse = await fetch(
            'http://localhost:4000/posts',
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const usersResponse = await fetch(
            'http://localhost:4000/users',
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
  
          const postsData = await postsResponse.json();
          const usersData = await usersResponse.json();
  
          setPosts(postsData.data);
          setUsers(usersData.data);
  
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
