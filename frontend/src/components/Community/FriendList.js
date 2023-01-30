import React from 'react';
import SearchComp from '../GlobalComponents/SearchComp';
import UserList from './UserList';

import Box from "@mui/material/Box";

function FriendList({items}) {
  const users = [
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
      level: 10,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
      level: 10,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
      level: 10,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
      level: 10,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
      level: 10,
    },
    {
      img_url: "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 1000,
      level: 10,
    },

  ]
  
  return (
    <>
      <h3>친구목록</h3>
      <SearchComp />
      <Box  padding="48px 112px">
        <UserList items = {users}/>
      </Box>
      
    </>
  )
}

export default FriendList;