import React from "react";

import SelfEvaluationInput from "./SelfEvaluationInput";
import { Box, Typography } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function SelfEvaluation({
  roomNo,
  selfScore = 0,
  selfDesc = "",
}) {
  return (
    <>
      <p
        css={css`
          font-size: 24px;
          margin: 0;
        `}
      >
        자기평가
      </p>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SelfEvaluationInput
          roomNo={roomNo}
          selfScore={selfScore}
          selfDesc={selfDesc}
        />
      </Box>
    </>
  );
}
