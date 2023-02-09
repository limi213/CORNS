import React from "react";

import SelfEvaluationInput from "./SelfEvaluationInput";
import { Box, Typography } from "@mui/material";

export default function SelfEvaluation({roomNo, selfScore=0, selfDesc=""}) {
  return (
    <>
      <Typography variant="h5">자기평가</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SelfEvaluationInput roomNo={roomNo} selfScore={selfScore} selfDesc={selfDesc} />
      </Box>
    </>
  );
}
