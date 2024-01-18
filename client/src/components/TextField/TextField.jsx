import React from 'react'
import { useState } from 'react'
import './style.css'

export default function TextField({userData}) {
  const [commentText, setCommentText] = useState('')
  function addComment(){
    console.log('add comment')
    console.log(commentText)
    setCommentText('')
  }
  return (
    <div className='text-field'>
        <div className="comment">
            <div className="comment-info">
                <img src={`/images/avatars/image-${userData.username}.png`} alt="user" />
            </div>
            <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" placeholder='Add a comment...' onChange={(e) => setCommentText(e.target.value) }></textarea>
            </div>
            <div className="send-comment-btn">
                <button onClick={() => addComment()} type="button">SEND</button>
            </div>
        </div>
    </div>
  )
}
