import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import { Outlet } from "react-router-dom";

function App() {
  function getComments(){
    axios.get('/data.json').then((res) => console.log(res.data)).catch((err) => console.log(err))
  }
  getComments()
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
