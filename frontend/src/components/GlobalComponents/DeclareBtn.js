import React from "react";
import { Box } from "@mui/material";
import siren from "assets/siren.png";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function DeclareBtn() {
  return (
    <Box sx={{ cursor: "pointer", display: "flex", minWidth: "10%" }}>
      <p
        css={css`
          font-size: 20px;
          color: #ff0000;
        `}
      >
        신고
      </p>
      <img
        src={siren}
        alt="corns-logo"
        css={css`
          height: 3rem;
          margin-left: 10%;
        `}
      />
    </Box>
  );
}

export default DeclareBtn;
