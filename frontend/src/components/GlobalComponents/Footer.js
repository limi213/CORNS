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
      <Box>
        <p>logo</p>
        <p>sns아이콘</p>
        <p>copyright</p>
        <p>멀캠 주소</p>
      </Box>
    </Box>
  );
}
