import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        setPosts(postsData);
        setUsers(usersData);
        setLoading(false);

        console.log("POSTS ARE SET: ", postsData);
        console.log("USERS ARE SET: ", usersData);
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ posts, users }}>
      {loading ? <p>Loading...</p> : children}
    </AppContext.Provider>
  );
}
