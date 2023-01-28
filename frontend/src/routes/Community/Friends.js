import React from 'react';
import FriendList from '../../components/Community/FriendList';
import FriendRequest from '../../components/Community/FriendRequest';

function Friends() {
  return (
    <>
      <h2>친구</h2>
      <FriendRequest />
      <FriendList />
    </>
  );

}

export default Friends;