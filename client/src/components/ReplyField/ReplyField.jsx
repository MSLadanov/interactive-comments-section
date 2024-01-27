import React, {useState} from 'react'
import axios from 'axios'
import './style.css'

export default function ReplyField({id, userData, receiverData}) {
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
        id,
        content: '',
        score: 0,
        createdAt: getFormattedDate(),
        replyingTo: receiverData.username,
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
        console.log(reply)
        axios.post('http://127.0.0.1:5000/api/v1/reply',{
          ...reply
        }).then((res) => {
          console.log(res.data)
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
