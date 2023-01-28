import React from 'react';
import RequestList from './RequestList';

function FriendRequest() {
  const users = [
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
    },
  ]
  
  
  return (
    <>
      <h3>친구신청</h3>
      <RequestList users={users}/>
    </>
  )
}

export default FriendRequest;