import Navbar from "components/GlobalComponents/Navbar";
import React from "react";
import Footer from "components/GlobalComponents/Footer";

import tutorial1 from "assets/tutorial1.png";
import tutorial2 from "assets/tutorial2.png";
import tutorial3 from "assets/tutorial3.png";
import tutorial4 from "assets/tutorial4.png";

import { Box } from "@mui/material";

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
        <Box
          sx={{
            marginTop: "0px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            textAlign: "center",
          }}
        >
          <img
            src={tutorial1}
            alt="tutorial1"
            css={css`
              width: 80%;
            `}
          />
          <img
            src={tutorial2}
            alt="tutorial2"
            css={css`
              width: 80%;
            `}
          />

          <img
            src={tutorial3}
            alt="tutorial3"
            css={css`
              width: 80%;
            `}
          />

          <img
            src={tutorial4}
            alt="tutorial4"
            css={css`
              width: 80%;
            `}
          />
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default Tutorial;
