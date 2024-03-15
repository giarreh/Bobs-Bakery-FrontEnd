import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext();

export default function AppContextProvider({children}) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // placeholder for the get requests (POSTS)
  useEffect(() => {

    const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPosts(data)
      console.log("POSTS ARE SET: ", data)
    } catch (error) {
      throw new Error('Error fetching the posts')
    }
    }
    fetchData()
  }, [])

  // placeholder for the get requests (USERS)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
        setLoading(false)
        console.log("USERS ARE SET: ", data)
      } catch (error) {
        throw new Error('Error fetching the users')
      }
    }
    fetchData()
  }, [])


  return (
    <AppContext.Provider value={{posts, users, loading}}>
      {!loading && children}
    </AppContext.Provider>
  )
}
