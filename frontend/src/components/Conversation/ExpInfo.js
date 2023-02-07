import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ExpInfo({ level, exp }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "55px",
          height: "55px",
          backgroundColor: "#ddd",
        }}
      ></Box>
      <Typography>Lv.{level}</Typography>
      <Typography>{exp} exp</Typography>
    </Box>
  );
}

export default ExpInfo;
