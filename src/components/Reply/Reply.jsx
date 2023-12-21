import React from 'react'
import './style.css'

export default function Reply({reply, setComments}) {
  return (
    <div>{reply.content}</div>
  )
}
