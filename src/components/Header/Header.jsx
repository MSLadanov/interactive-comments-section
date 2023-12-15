import React from 'react'
import './style.css'

export default function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <img src="/images/logo.svg" alt="logo"/>
        <h1>Comments</h1>
      </div>
      <div className='menu'></div>
    </div>
  )
}
