import React from 'react'
import './style.css'

export default function Comment({comment, setComments}) {
  console.log(comment)
  return (
    <div className='comment'>
      <div className='vote-section'>
        <div className='comment-vote'>
          <div className="comment-like">
            <img src="/images/icon-plus.svg" alt="like" />
          </div>
          <div className="comment-likes">{comment.score}</div>
          <div className="comment-dislikes">
            <img src="/images/icon-minus.svg" alt="dislike" />
          </div>
        </div>
      </div>
      <div className='comment-section'>
        <div className="comment-header">
          <div className='comment-info'>
            <img src={`/images/avatars/image-${comment.user.username}.png`} alt="user" />
            <h4>{comment.user.username}</h4>
            <h5>{comment.createdAt}</h5>
          </div>
          <div className='comment-reply'>
            <img src="/images/icon-reply.svg" alt="reply" />
            <h4>Reply</h4>
          </div>
        </div>
        <div className='comment-text'>
          {comment.content}
        </div>
      </div>
    </div>
  )
}
