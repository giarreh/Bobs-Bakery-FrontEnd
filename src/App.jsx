import './App.css';
import AppContextProvider from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import UserContextProvider from './context/UserContext';
import PostList from './components/posts/PostList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';


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
                <Route path="/" element={<PrivateRoutes />} />
                <Route path="/posts" element={<PostList />} />
              </Routes>
            </main>
          </div>
        </AppContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
