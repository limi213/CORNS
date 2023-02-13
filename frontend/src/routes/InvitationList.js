import React from "react";
import Navbar from "components/GlobalComponents/Navbar";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function InvitationList() {
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
        <h1>invitation List</h1>
      </div>
    </div>
  );
}

export default InvitationList;
