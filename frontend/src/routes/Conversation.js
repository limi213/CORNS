import React from "react";

import Navbar from "../components/GlobalComponents/Navbar";
import LogInUserArea from "../components/Conversation/LogInUserArea";
import AnonymousUserArea from "../components/Conversation/AnonymousUserArea";
import ConversationRoomFilter from "../components/Conversation/ConversationRoomFilter";
import RoomCreateModal from "../components/Conversation/RoomCreateForm";
import SelfEvaluationModal from "../components/Conversation/SelfEvaluationModal";
import RoomListsContainer from "redux/containers/RoomListsContainer";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Conversation() {
  const user = true;

  return (
    <div
      css={css`
        margin: 0 105px;
      `}
    >
      <Navbar />
      <div
        css={css`
          margin: 124px 0 0 0;
        `}
      >
        {user ? <LogInUserArea /> : <AnonymousUserArea />}
        <h2>쫑알룸리스트</h2>
        <ConversationRoomFilter />
        <RoomListsContainer />
        <RoomCreateModal />
        <SelfEvaluationModal />
      </div>
    </div>
  );
}

export default Conversation;
