import './App.css';
import AppContextProvider from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import UserContextProvider from './context/UserContext';
import PostList from './components/posts/PostList';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import UserProfile from './components/profiles/UserProfile';
import PostListItemDetails from './components/posts/PostListItemDetails';
import CreatePost from './components/posts/CreatePost/CreatePost';
import TopPosts from './components/filteredposts/TopPosts';


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
                <Route path='/top' element={<TopPosts />} />
                <Route path='posts/:id' element={<PostListItemDetails />} />
                <Route path='/create' element={<CreatePost />} />
                <Route path='/me' element={<UserProfile />} />
              </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </AppContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
