import './App.css';
import AppContextProvider from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import UserContextProvider from './context/UserContext';
import PostList from './components/posts/PostList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Signup from './components/auth/Signup';


function App() {
  return (
    <Router>
      <UserContextProvider>
        <AppContextProvider>
        <Header />
          <div className="content">
            <Sidebar />
            <main className="main">
              <Routes>
                {/* ROUTES nested inside PrivateRoutes route requires that the user is signed in */}
              <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<PostList />} />
                <Route path="/posts" element={<PostList />} />
              </Route>
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </div>
        </AppContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
