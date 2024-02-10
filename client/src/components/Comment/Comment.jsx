import React, { useEffect } from 'react'
import { useState } from 'react'
import Reply from '../Reply/Reply'
import ActionButton from '../ActionButton/ActionButton'
import './style.css'
import ReplyField from '../ReplyField/ReplyField'
import axios from 'axios'

export default function Comment({comment, comments, setComments, userData, setUserData}) {
  const [showReplyField, setShowReplyField] = useState(false)
  const [showEditField, setShowEditField] = useState(false)
  const [currentComment, setCurrentComment] = useState({
    ...comment
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
  function editComment(){
    axios.patch('http://127.0.0.1:5000/api/v1/comment', {
        ...currentComment,
        editedAt: getFormattedDate(),
    }).then((res) => {
      setComments(res.data)
      setShowEditField(false)
    }
    ).catch((err) => console.log(err));
  }
  function gradeHandler(){
    let myGrade = comment.score.find((el) => el.username === userData.username)
    myGrade ? myGrade = myGrade.result : myGrade = null
    const score = comment.score.reduce((acc, curr) => {
      if(curr.result === 'like'){
        return acc + 1
      } else if (curr.result === 'dislike'){
        return acc - 1
      }
    },0)
    setGrades({...grades, grade: score, yourGrade: myGrade})
  }
  useEffect(() => {
    gradeHandler()
  }, [])
  return (
    <>
      <div className='comment'>
        <div className='vote-section'>
          <div className='comment-vote'>
            <button className={grades.yourGrade === "like" ? "comment-like toggled" : "comment-like"}>
              <img src="/images/icon-plus.svg" alt="like" />
            </button>
            <div className="comment-likes">{grades.grade}</div>
            <button className={grades.yourGrade === "dislike" ? "comment-dislike toggled" : "comment-dislike"}>
              <img src="/images/icon-minus.svg" alt="dislike" />
            </button>
          </div>
        </div>
        <div className='comment-section'>
          <div className="comment-header">
            <div className='comment-info'>
              <img src={`/images/avatars/image-${comment.user.username}.png`} alt="user" />
              <h4>{comment.user.username}</h4>
              {comment.user.username === userData.username && <div className='current-user'>You</div>}
              {comment.editedAt ? <h5>edited at: {comment.editedAt}</h5> : <h5>{comment.createdAt}</h5>}
            </div>
            <div className="comment-actions">
              <ActionButton 
                comment={comment} 
                user={userData} 
                comments={comments} 
                setComments={setComments} 
                setShowReplyField={setShowReplyField} 
                setShowEditField={setShowEditField}
                currentElement={currentComment} />
            </div>
          </div>
          {!showEditField ? <div className='comment-text'>
            {comment.content}
          </div> : 
        <div className='reply-field edit-form'>
          <div className='comment'>
            <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" defaultValue={comment.content}  onChange={(e) => setCurrentComment({...currentComment, content: e.target.value}) }></textarea>
            </div>
            <div className="send-comment-btn">
                <button type="button" onClick={() => editComment()}>UPDATE</button>
            </div>
        </div>
        </div>}
          <div className="mobile-comment-menu">
            <div className='vote-section'>
            <div className='comment-vote'>
              <div className="comment-like">
                <img src="/images/icon-plus.svg" alt="like" />
              </div>
              <div className="comment-likes">{grades.grade}</div>
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
          {showReplyField && <ReplyField className='replies' id={comment.id} userData={userData} receiverData={comment.user} setComments={setComments} setShowReplyField={setShowReplyField}/>}
          {comment.replies && comment.replies.map((reply) => <Reply comment={comment} key={reply.id} reply={reply} comments={comments} setComments={setComments} userData={userData} setUserData={setUserData} />)}
        </div>
      </div>
    </>
  )
}
