import React from "react";

import Box from "@mui/material/Box";
import ProgressBar from "../../components/Conversation/ProgressBar";

function AttendanceInfo({}) {
  return (
    <>
      <h5>이번달 출석률</h5>
      <Box sx={{ display: "flex" }}>
        <Box>0%</Box>
        <ProgressBar percent={30} />
        <Box>100%</Box>
      </Box>
    </>
  );
}

export default AttendanceInfo;
