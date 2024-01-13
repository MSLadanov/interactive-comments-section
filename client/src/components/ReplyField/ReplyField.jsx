import React from 'react'
import './style.css'

export default function ReplyField({userData, receiverData}) {
  return (
    <div className='reply-field' >
        <div className="comment">
            <div className="comment-info">
                <img src={`/images/avatars/image-${userData.username}.png`} alt="user" />
            </div>
            <div className="text-field-input">
                <textarea name="" id="" cols="30" rows="5" placeholder='Add a reply...' defaultValue={'@' + receiverData.username}></textarea>
            </div>
            <div className="send-comment-btn">
                <button type="button">REPLY</button>
            </div>
        </div>
    </div>
  )
}
