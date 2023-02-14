import Navbar from "components/GlobalComponents/Navbar";
import React from "react";
import Footer from "components/GlobalComponents/Footer";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Tutorial() {
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
            margin: 124px 0 0 0;
          `}
        >
          <h1>Tutorial</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tutorial;
