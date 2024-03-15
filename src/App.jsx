import './App.css';
import MainBody from './components/MainBody';
import Sidebar from './components/Sidebar';
import Header from './components/header';



function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Sidebar />
        <MainBody />
      </div>
    </>
  );
}

export default App;
