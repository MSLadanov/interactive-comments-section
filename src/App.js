import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import { Outlet } from "react-router-dom";

function App() {
  const [comments, setComments] = useState();
  const [userData, setUserData] = useState();
  function getData(){
    axios.get('/data.json').then((res) => {
      setUserData(res.data.currentUser)
      setComments(res.data.comments)
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className="App">
      <Header />
      <Outlet context={[comments, setComments, userData, setUserData]}/>
    </div>
  );
}

export default App;
