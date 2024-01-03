import React from 'react'
import Reply from '../Reply/Reply'
import ActionButton from '../ActionButton/ActionButton'
import './style.css'
import ReplyField from '../ReplyField/ReplyField'

export default function Comment({comment, comments, setComments, userData, setUserData}) {
  return (
    <>
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
              {comment.user.username === userData.username && <div className='current-user'>You</div>}
              <h5>{comment.createdAt}</h5>
            </div>
            <div className="comment-buttons">
              <ActionButton comment={comment} user={userData} comments={comments} setComments={setComments} />
            </div>
          </div>
          <div className='comment-text'>
            {comment.content}
          </div>
        </div>
      </div>
      <div className='replies-section'>
        <div className='vertical-line'></div>
        <div className='replies'>{comment.replies.map((reply) => <Reply key={reply.id} reply={reply} comments={comments} setComments={setComments} userData={userData} setUserData={setUserData} />)}</div>
      </div>
      <ReplyField userData={userData}/>
    </>
    
 
  )
}
