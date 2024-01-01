import React from 'react'
import './style.css'

export default function ActionButton({ author, user }) {
  if (user === author){
    return (
    <div className='comment-actions'>
      <div className='comment-button'>
            <img src="/images/icon-delete.svg" alt="reply" />
            <h4>Delete</h4>
          </div>
          <div className='comment-button'>
            <img src="/images/icon-edit.svg" alt="reply" />
            <h4>Edit</h4>
          </div>
    </div>)
  } else{
    return (
    <div className='comment-actions'>
      <div className='comment-button'>
          <img src="/images/icon-reply.svg" alt="reply" />
          <h4>Reply</h4>
        </div>
    </div>)
  }
}
