import React from 'react'
import './style.css'

export default function Reply({reply, setComments, userData, setUserData}) {
  return (
    <div className='comment'>
    <div className='vote-section'>
      <div className='comment-vote'>
        <div className="comment-like">
          <img src="/images/icon-plus.svg" alt="like" />
        </div>
        <div className="comment-likes">{reply.score}</div>
        <div className="comment-dislikes">
          <img src="/images/icon-minus.svg" alt="dislike" />
        </div>
      </div>
    </div>
    <div className='comment-section'>
      <div className="comment-header">
        <div className='comment-info'>
          <img src={`/images/avatars/image-${reply.user.username}.png`} alt="user" />
          <h4>{reply.user.username}</h4>
          {reply.user.username === userData.username && <div className='current-user'>You</div>}
          <h5>{reply.createdAt}</h5>
        </div>
        <div className='comment-reply'>
          <img src="/images/icon-reply.svg" alt="reply" />
          <h4>Reply</h4>
        </div>
      </div>
      <div className='comment-text'>
        {reply.content}
      </div>
    </div>
  </div>
  )
}
