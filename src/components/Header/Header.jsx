import React from 'react'
import { useOutletContext } from 'react-router-dom'
import './style.css'

export default function Header() {
  // const [userData, setUserData] = useOutletContext()
  return (
    <div className='header'>
      <div className='logo'>
        <img src="/images/logo.svg" alt="logo"/>
        <h1>Ravely</h1>
      </div>
      <div className='menu'>
        <div className='comment-info'>
          {/* <img src={`/images/avatars/image-${userData.user.username}.png`} alt="user" /> */}
        </div>
      </div>
    </div>
  )
}
