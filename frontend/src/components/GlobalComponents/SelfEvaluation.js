import React from "react";

import StarRating from "./StarRating";
import SelfEvaluationInput from "./SelfEvaluationInput";
import Box from "@mui/material/Box";

export default function SelfEvaluation({}) {
  return (
    <>
      <h3>자기평가</h3>
      <Box>
        <StarRating />
        <SelfEvaluationInput />
      </Box>
    </>
  );
}
