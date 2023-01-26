import React from "react";

import Navbar from "../components/GlobalComponents/Navbar";
import LogInUserArea from "../components/Conversation/LogInUserArea";
import AnonymousUserArea from "../components/Conversation/AnonymousUserArea";
import ConversationRoomFilter from "../components/Conversation/ConversationRoomFilter";
import RoomList from "../components/Conversation/RoomList";
import BasicModal from "../components/Conversation/RoomCreateForm";

function Conversation() {
  const user = true;

  return (
    <>
      <Navbar />
      {user ? <LogInUserArea /> : <AnonymousUserArea />}
      <h2>쫑알룸리스트</h2>
      <ConversationRoomFilter />
      <RoomList />
      <BasicModal />
    </>
  );
}

export default Conversation;
