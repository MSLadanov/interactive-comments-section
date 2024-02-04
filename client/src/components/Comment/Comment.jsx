import React from 'react'
import { useState } from 'react'
import Reply from '../Reply/Reply'
import ActionButton from '../ActionButton/ActionButton'
import './style.css'
import ReplyField from '../ReplyField/ReplyField'

export default function Comment({comment, comments, setComments, userData, setUserData}) {
  const [showReplyField, setShowReplyField] = useState(false)
  const [showEditField, setShowEditField] = useState(false)
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
            <div className="comment-actions">
              <ActionButton comment={comment} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} setShowEditField={setShowEditField} />
            </div>
          </div>
          {!showEditField ? <div className='comment-text'>
            {comment.content}
          </div> : <textarea></textarea>}
          <div className="mobile-comment-menu">
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
          <div className="comment-actions">
              <ActionButton comment={comment} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} setShowEditField={setShowEditField} />
            </div>
          </div>
        </div>
      </div>
      <div className='replies-section'>
        <div className='vertical-line'></div>
        <div className='replies'>
          {showReplyField && <ReplyField className='replies' id={comment.id} userData={userData} receiverData={comment.user}/>}
          {comment.replies && comment.replies.map((reply) => <Reply comment={comment} key={reply.id} reply={reply} comments={comments} setComments={setComments} userData={userData} setUserData={setUserData} />)}
        </div>
      </div>
    </>
  )
}
