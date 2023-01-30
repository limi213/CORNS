import React from 'react';
import FriendList from '../../components/Community/FriendList';
import FriendRequest from '../../components/Community/FriendRequest';
import Box from "@mui/material/Box";

function Friends() {
  return (
    <>
      <h2>친구</h2>
      <Box>
        <FriendRequest />
      </Box>
      <Box>
        <FriendList />
      </Box>
      
    </>
  );

}

export default Friends;