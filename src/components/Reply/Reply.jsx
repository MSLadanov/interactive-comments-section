import React from 'react'
import { useState } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import './style.css'
import ReplyField from '../ReplyField/ReplyField'

export default function Reply({reply, comments, setComments, userData, setUserData}) {
  const [showReplyField, setShowReplyField] = useState(false)
  return (
    <>
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
          <ActionButton comment={reply} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} />
        </div>
        <div className='comment-text'>
          <p>{'@' + reply.replyingTo}</p>
          <p>{' ' + reply.content}</p>
        </div>
        <div className="mobile-comment-menu">
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
          <div className="comment-actions">
              <ActionButton comment={reply} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} />
            </div>
          </div>
      </div>
    </div>
    {showReplyField && <ReplyField userData={userData} receiverData={reply.user}/>}
    </>
  )
}
