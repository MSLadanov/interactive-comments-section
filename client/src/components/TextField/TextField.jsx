import React from 'react'
import './style.css'

export default function TextField({userData}) {
  return (
    <div className='text-field'>
        <div className="comment">
            <div className="comment-info">
                <img src={`/images/avatars/image-${userData.username}.png`} alt="user" />
            </div>
            <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" placeholder='Add a comment...'></textarea>
            </div>
            <div className="send-comment-btn">
                <button type="button">SEND</button>
            </div>
        </div>
    </div>
  )
}
