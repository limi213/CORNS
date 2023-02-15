import * as React from "react";

import Box from "@mui/material/Box";

function ProgressBar({ color, percent, value }) {
  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "70%", gap: "10px", justifyContent:"center", mt: "10px", mb: "0"}}>
      <Box sx={{ border: "3px solid #111", height: "1.5rem", width: "100%" }}>
        <Box
          sx={{
            backgroundColor: `${color}`,
            borderRight: "3px solid #111",
            height: "1.5rem",
            width: `${percent}%`,
          }}
        />
      </Box>
      <Box sx={{ml: `${percent*0.95}%`}}>{value}</Box>
    </Box>
  );
}

export default ProgressBar;
