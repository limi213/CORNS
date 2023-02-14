import React from "react";

import Navbar from "components/GlobalComponents/Navbar";
import IsLogin from "auth/IsLogin";
import Footer from "components/GlobalComponents/Footer";
import LogInUserArea from "components/Conversation/LogInUserArea";
import ConversationRoomFilter from "components/Conversation/ConversationRoomFilter";
import RoomCreateModal from "components/Conversation/RoomCreateForm";
import RoomListsContainer from "store/containers/RoomListsContainer";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Conversation() {
  const user = IsLogin();

  return (
    <div>
      <div
        css={css`
          margin: 0 105px;
          height: auto;
          min-height: 100%;
          padding-bottom: 35vh;
        `}
      >
        <Navbar />
        <div
          css={css`
            margin: 64px 0 0 0;
          `}
        >
          {user ? <LogInUserArea /> : null}
          <h2>쫑알룸리스트</h2>
          <ConversationRoomFilter />
          <RoomListsContainer />
          <RoomCreateModal />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Conversation;
