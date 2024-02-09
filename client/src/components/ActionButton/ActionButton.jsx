import React from 'react'
import axios from 'axios'
import './style.css'

export default function ActionButton({comment, user, comments, setComments, setShowReplyField, setShowEditField, currentElement}) {
  function remove(){
    axios.delete('http://127.0.0.1:5000/api/v1/comment', {
      data: {
        ...comment
      }
    }).then((res) => {
      setComments(res.data)
    }
    ).catch((err) => console.log(err));
  }
  function edit(){
    setShowEditField(prev => !prev)
  }
  function reply(){
    setShowReplyField(prev => !prev)
  }
  if (user.username === comment.user.username){
    return (
    <div className='comment-actions'>
      <div className='comment-button' onClick={() => remove()}>
            <img src="/images/icon-delete.svg" alt="delete" />
            <h4>Delete</h4>
          </div>
          <div className='comment-button' onClick={() => edit()}>
            <img src="/images/icon-edit.svg" alt="edit" />
            <h4>Edit</h4>
          </div>
    </div>)
  } else{
    return (
    <div className='comment-actions'>
      <div className='comment-button' onClick={() => reply()}>
          <img src="/images/icon-reply.svg" alt="reply" />
          <h4>Reply</h4>
        </div>
    </div>)
  }
}
