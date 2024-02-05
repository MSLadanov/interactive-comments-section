import React from 'react'
import { useState } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import './style.css'
import ReplyField from '../ReplyField/ReplyField'

export default function Reply({comment, reply, comments, setComments, userData, setUserData}) {
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
          <ActionButton comment={reply} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} setShowEditField={setShowEditField}/>
        </div>
        {!showEditField ? 
        <div className='comment-text'>
        <p>{'@' + reply.replyingTo}</p>
        <p>{' ' + reply.content}</p>
      </div> : 
      <div className='reply-field edit-form'>
        <div className='comment'>
        <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" placeholder={' ' + reply.content}></textarea>
            </div>
            <div className="send-comment-btn">
                <button type="button">UPDATE</button>
            </div>
        </div>
      </div>}
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
              <ActionButton comment={reply} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} setShowEditField={setShowEditField}/>
            </div>
          </div>
      </div>
    </div>
    {showReplyField && <ReplyField id={comment.id} userData={userData} receiverData={reply.user}/>}
    </>
  )
}
