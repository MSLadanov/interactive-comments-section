import React from 'react'
import { useState, useEffect } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import './style.css'
import ReplyField from '../ReplyField/ReplyField'
import axios from 'axios'

export default function Reply({comment, reply, comments, setComments, userData, setUserData}) {
  const [showReplyField, setShowReplyField] = useState(false)
  const [showEditField, setShowEditField] = useState(false)
  const [currentReply, setCurrentReply] = useState({
    ...reply
  })
  const [grades, setGrades] = useState({
    yourGrade: null, 
    grade: 0,
  }) 
  function getFormattedDate(){
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1
    let dd = today.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    return dd + '.' + mm + '.' + yyyy
  }
  function editReply(){
    axios.patch('http://127.0.0.1:5000/api/v1/comment', {
        ...currentReply,
        editedAt: getFormattedDate(),
    }).then((res) => {
      setShowEditField(false)
      setComments(res.data)
    }
    ).catch((err) => console.log(err));
  }
  function gradeHandler(){
    let score = 0
    let myGrade = null
    if (reply.score !== undefined){
      myGrade = reply.score.find((el) => el.userId === userData.userId)
      myGrade ? myGrade = myGrade.result : myGrade = null
      score = reply.score.reduce((acc, curr) => {
      if(curr.result === 'like'){
          return acc + 1
      } else if (curr.result === 'dislike'){
          return acc - 1
        }
      },0)
    }
    setGrades({...grades, grade: score, yourGrade: myGrade})
  }
  function likeComment(username, userId, result){
    axios.patch('http://127.0.0.1:5000/api/v1/comment/like', {
        id: currentReply.id,
        replyingPostId: currentReply.replyingPostId,
        username,
        userId,
        result
    }).then((res) => {
      console.log(res.data)
      setComments(res.data)
    }
    ).catch((err) => console.log(err));
  }
  useEffect(() => {
    gradeHandler()
  }, [comment])
  return (
    <>
    <div className='comment'>
      <div className='vote-section'>
        <div className='comment-vote'>
          <button className={grades.yourGrade === "like" ? "comment-like toggled" : "comment-like"} onClick={() => likeComment(userData.username, userData.userId, 'like')}>
            <img src="/images/icon-plus.svg" alt="like" />
          </button>
          <div className="comment-likes">{grades.grade}</div>
          <button className={grades.yourGrade === "dislike" ? "comment-dislike toggled" : "comment-dislike"} onClick={() => likeComment(userData.username, userData.userId, 'dislike')}>
            <img src="/images/icon-minus.svg" alt="dislike" />
          </button>
        </div>
      </div>
      <div className='comment-section'>
        <div className="comment-header">
          <div className='comment-info'>
            <img src={`/images/avatars/image-${reply.user.username}.png`} alt="user" />
            <h4>{reply.user.username}</h4>
            {reply.user.username === userData.username && <div className='current-user'>You</div>}
            {reply.editedAt ? <h5>edited at: {reply.editedAt}</h5> : <h5>{reply.createdAt}</h5>}
          </div>
          <ActionButton 
            comment={reply} 
            user={userData} 
            comments={comments} 
            setComments={setComments} 
            setShowReplyField={setShowReplyField} 
            setShowEditField={setShowEditField} 
            currentElement={currentReply} />
        </div>
        {!showEditField ? 
        <div className='comment-text'>
        <p>{'@' + reply.replyingTo}</p>
        <p>{' ' + reply.content}</p>
      </div> : 
      <div className='reply-field edit-form'>
        <div className='comment'>
          <div className="text-field-input">
            <div>
              <p>To:</p>
              <input type="text" defaultValue={'@' + reply.replyingTo} onChange={(e) => setCurrentReply({...currentReply, replyingTo: e.target.value}) }/>
            </div>
            <textarea name="" id="" cols="30" rows="5" defaultValue={' ' + reply.content} onChange={(e) => setCurrentReply({...currentReply, content: e.target.value}) }></textarea>
          </div>
          <div className="send-comment-btn">
              <button type="button" onClick={() => editReply()}>UPDATE</button>
          </div>
        </div>
      </div>}
        <div className="mobile-comment-menu">
            <div className='vote-section'>
            <div className='comment-vote'>
              <button className={grades.yourGrade === "like" ? "comment-like toggled" : "comment-like"} onClick={() => likeComment(userData.username, userData.userId, 'like')}>
              <img src="/images/icon-plus.svg" alt="like" />
              </button>
              <div className="comment-likes">{grades.grade}</div>
              <button className={grades.yourGrade === "dislike" ? "comment-dislike toggled" : "comment-dislike"} onClick={() => likeComment(userData.username, userData.userId, 'dislike')}>
                <img src="/images/icon-minus.svg" alt="dislike" />
              </button>
            </div>
          </div>
          <div className="comment-actions">
              <ActionButton comment={reply} user={userData} comments={comments} setComments={setComments} setShowReplyField={setShowReplyField} setShowEditField={setShowEditField}/>
            </div>
          </div>
      </div>
    </div>
    {showReplyField && <ReplyField id={comment.id} userData={userData} receiverData={reply.user} setComments={setComments} setShowReplyField={setShowReplyField}/>}
    </>
  )
}
