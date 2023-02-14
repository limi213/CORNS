import React from "react";

import Navbar from "components/GlobalComponents/Navbar";
import IsLogin from "auth/IsLogin";

import LogInUserArea from "components/Conversation/LogInUserArea";
import ConversationRoomFilter from "components/Conversation/ConversationRoomFilter";
import RoomCreateModal from "components/Conversation/RoomCreateForm";
import RoomListsContainer from "store/containers/RoomListsContainer";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Conversation() {
  const user = IsLogin();

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
        {user ? <LogInUserArea /> : null}
        <h2>쫑알룸리스트</h2>
        <ConversationRoomFilter />
        <RoomListsContainer />
        <RoomCreateModal />
      </div>
    </div>
  );
}

export default Conversation;
