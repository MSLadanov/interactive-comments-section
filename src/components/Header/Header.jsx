import React from 'react'
import './style.css'

export default function Header({userData, setUserData}) {
  console.log(userData)
  return (
    <div className='header'>
      <div className='logo'>
        <img src="/images/logo.svg" alt="logo"/>
        <h1>Comments</h1>
      </div>
      <div className='menu'>
        {userData ? <div className='comment-info'>
          <img src={userData.image.png.slice(1)} alt="user" />
        </div> : <div> No user</div>}
      </div>
    </div>
  )
}
