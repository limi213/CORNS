import Navbar from "components/GlobalComponents/Navbar";
import React from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Tutorial() {
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
        <h1>Tutorial</h1>
      </div>
    </div>
  );
}

export default Tutorial;
