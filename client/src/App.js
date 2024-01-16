import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import { Outlet } from "react-router-dom";

function App() {
  const [comments, setComments] = useState();
  const [userData, setUserData] = useState();
  function getMockData(){
    axios.get('/data.json').then((res) => {
      // console.log(res.data)
      setUserData(res.data.currentUser)
      setComments(res.data.comments)
    }).catch((err) => console.log(err))
  }
  function getAPIData(){
    axios.get('http://127.0.0.1:5000/api/v1/').then((res) => {
      // console.log(res.data)
      setUserData(res.data.currentUser)
      setComments(res.data.comments)
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    getAPIData()
    // getMockData()
  }, [])
  
  return (
    <div className="App">
      <Header userData={userData} setUserData={setUserData}/>
      <Outlet context={[comments, setComments, userData, setUserData]}/>
    </div>
  );
}

export default App;
