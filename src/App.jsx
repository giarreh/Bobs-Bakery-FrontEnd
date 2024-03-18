import './App.css';
import AppContextProvider from './context/AppContext';
import MainBody from './components/MainBody';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import UserContextProvider from './context/UserContext';
import PostList from './components/posts/PostList';



function App() {
  return (
    <UserContextProvider>
      <AppContextProvider>
      <Header />
        <div className="content">
          <Sidebar />
          <main className="main">
            <PostList />
          </main>
        </div>
      </AppContextProvider>
    </UserContextProvider>
  );
}

export default App;
