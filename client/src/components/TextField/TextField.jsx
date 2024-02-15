import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './style.css'

export default function TextField({userData, setComments}) {
  function getFormattedDate(){
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1
    let dd = today.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    return dd + '.' + mm + '.' + yyyy
  }
  const [comment, setComment] = useState({
    id: uuidv4(),
    content: '',
    score: [],
    createdAt: getFormattedDate(),
    user:{
      image: {
        png: userData.image.png,
        webp: userData.image.webp,
      },
      username: userData.username,
    }
  })
  function addComment(){
    setComment({...comment, createdAt: getFormattedDate()})
    axios.post('http://127.0.0.1:5000/api/v1/comment',{
      ...comment
    }).then((res) => {
      setComments(res.data)
      setComment({...comment, content: ''})
    }).catch((err) => console.log(err))
  }
  return (
    <div className='text-field'>
        <div className="comment">
            <div className="comment-info">
                <img src={`/images/avatars/image-${userData.username}.png`} alt="user" />
            </div>
            <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" placeholder='Add a comment...' value={comment.content} onChange={(e) => setComment({...comment, content: e.target.value}) }></textarea>
            </div>
            <div className="send-comment-btn">
                <button onClick={() => addComment()} type="button">SEND</button>
            </div>
        </div>
    </div>
  )
}
