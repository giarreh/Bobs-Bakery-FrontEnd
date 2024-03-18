import './App.css';
import AppContextProvider from './context/AppContext';
import MainBody from './components/MainBody';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import UserContextProvider from './context/UserContext';



function App() {
  return (
    <UserContextProvider>
      <AppContextProvider>
      <Header />
        <div className="content">
          <Sidebar />
          <MainBody />
        </div>
      </AppContextProvider>
    </UserContextProvider>
  );
}

export default App;
