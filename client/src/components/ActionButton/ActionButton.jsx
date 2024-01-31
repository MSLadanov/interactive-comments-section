import React from 'react'
import axios from 'axios'
import './style.css'

export default function ActionButton({comment, user, comments, setComments, setShowReplyField}) {
  function remove(){
    // console.log(comment.id)
    console.log(comment)
    console.log(comment)
    axios.delete('http://127.0.0.1:5000/api/v1/comment', {
      data: {
        ...comment
      }
    }).then((res) => console.log(res.data)
    ).catch((err) => console.log(err));
  }
  function edit(){
    // console.log(comment.id)
  }
  function reply(){
    // console.log(comment.id)
    // console.log(comment.user.username)
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
