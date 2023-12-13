import React from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
  let { profileId } = useParams();
  console.log(profileId)
  return (
    <div>Profile</div>
  )
}
