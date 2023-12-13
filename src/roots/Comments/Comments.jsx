import axios from 'axios'
import React from 'react'

export default function Comments() {
  function getComments(){
    axios.get('/data.json').then((res) => console.log(res.data)).catch((err) => console.log(err))
  }
  getComments()
  return (
    <div>Comments</div>
  )
}
