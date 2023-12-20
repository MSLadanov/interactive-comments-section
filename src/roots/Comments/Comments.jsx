import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Comment from '../../components/Comment/Comment'
import './style.css'

export default function Comments() {
  const [comments, setComments, userData, setUserData] = useOutletContext()
  if(comments){return (
    <div className='comments'>{comments.map((comment) => <Comment key={comment.id} comment={comment} setComments={setComments}/>)}</div>
  )}
}
