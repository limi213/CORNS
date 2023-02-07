import * as React from "react";

import Box from "@mui/material/Box";

function ProgressBar({ color, percent }) {
  return (
    <Box sx={{ border: "3px solid #111", height: "1.5rem", width: "70%" }}>
      <Box
        sx={{
          backgroundColor: `${color}`,
          borderRight: "3px solid #111",
          height: "1.5rem",
          width: `${percent}%`,
        }}
      ></Box>
    </Box>
  );
}

export default ProgressBar;
