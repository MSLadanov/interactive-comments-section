import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import './style.css'

export default function ReplyField({id, userData, receiverData, setComments, setShowReplyField}) {
    function getFormattedDate(){
        const today = new Date()
        const yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()
        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm
        return dd + '.' + mm + '.' + yyyy
      }
      const [reply, setReply] = useState({
        id: uuidv4(),
        content: '',
        score: [],
        createdAt: getFormattedDate(),
        replyingTo: receiverData.username,
        replyingPostId: id,
        user:{
          image: {
            png: userData.image.png,
            webp: userData.image.webp,
          },
          username: userData.username,
        }
      })
      function addReply(){
        setReply({...reply, createdAt: getFormattedDate()})
        axios.post('http://127.0.0.1:5000/api/v1/reply',{
          ...reply
        }).then((res) => {
          setComments(res.data)
          setShowReplyField(false)
        }).catch((err) => console.log(err))
      }
      function removeReply(){
        axios.delete('http://127.0.0.1:5000/api/v1/reply',{
        }).then((res) => {
          setComments(res.data)
        }).catch((err) => console.log(err))
      }
  return (
    <div className='reply-field' >
        <div className="comment">
            <div className="comment-info">
                <img src={`/images/avatars/image-${userData.username}.png`} alt="user" />
            </div>
            <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" placeholder='Add a reply...' onChange={(e) => setReply({...reply, content: e.target.value}) }></textarea>
            </div>
            <div className="send-comment-btn">
                <button type="button" onClick={() => addReply()}>REPLY</button>
            </div>
        </div>
    </div>
  )
}
