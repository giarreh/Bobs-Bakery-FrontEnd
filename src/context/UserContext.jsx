import { useContext, createContext, useState } from "react"

export const UserContext = createContext()

export default function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  )
}
