import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#ddd",
        width: "100%",
        height: "30vh",
        position: "absolute",
        transform: "translateY(-100%)",
      }}
    >
      <h3
        css={css`
          text-align: center;
        `}
      >
        푸터영역입니다.
      </h3>
    </Box>
  );
}
