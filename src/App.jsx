import './App.css';
import AppContextProvider from './context/AppContext';
import MainBody from './components/MainBody';
import Sidebar from './components/Sidebar';
import Header from './components/header';



function App() {
  return (
    <AppContextProvider>
      <Header />
      <div className="content">
        <Sidebar />
        <MainBody />
      </div>
    </AppContextProvider>
  );
}

export default App;
