import React, {useState} from 'react';
import SearchComp from '../../components/GlobalComponents/SearchComp';
import UserList from '../../components/Community/UserList';

import Box from "@mui/material/Box";

function SearchUser() {
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
      <h2>유저 검색</h2>
      <SearchComp />

      <Box>
        <UserList items={users} />
      </Box>
    </>
  );

}

export default SearchUser;