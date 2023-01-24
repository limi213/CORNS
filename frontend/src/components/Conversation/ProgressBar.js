import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#fff",
    border: "3px solid #111",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#FFC804",
    borderRight: "3px solid #111",
  },
}));

function ProgressBar({ color, percent }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BorderLinearProgress variant="determinate" value={percent} />
    </Box>
  );
}

export default ProgressBar;
