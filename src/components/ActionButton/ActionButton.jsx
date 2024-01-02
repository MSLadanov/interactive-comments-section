import React from 'react'
import './style.css'

export default function ActionButton({comment, user, comments, setComments}) {
  function deleteComment(){
    console.log(comment.id)
  }
  function editComment(){
    console.log(comment.id)
  }
  function replyComment(){
    console.log(comment.id)
    console.log(comment.user.username)
    let arr = [...comments]
    const newEl = {
      id : 54
    }
    arr.splice(comment.id + 1, 0 , newEl)
    console.log(arr)
    // setComments(newArr)
  }
  if (user.username === comment.user.username){
    return (
    <div className='comment-actions'>
      <div className='comment-button' onClick={() => deleteComment()}>
            <img src="/images/icon-delete.svg" alt="delete" />
            <h4>Delete</h4>
          </div>
          <div className='comment-button' onClick={() => editComment()}>
            <img src="/images/icon-edit.svg" alt="edit" />
            <h4>Edit</h4>
          </div>
    </div>)
  } else{
    return (
    <div className='comment-actions'>
      <div className='comment-button' onClick={() => replyComment()}>
          <img src="/images/icon-reply.svg" alt="reply" />
          <h4>Reply</h4>
        </div>
    </div>)
  }
}
