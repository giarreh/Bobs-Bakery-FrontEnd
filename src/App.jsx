import './App.css';
import Header from './Header/header';
import MainBody from './MainBody/MainBody';
import Sidebar from './Sidebar/Sidebar';


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
