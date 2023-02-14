import { React, useEffect } from "react";

import ExperienceIndicator from "components/GrowthRecord/ExperienceIndicator";
import ExperienceTable from "components/GrowthRecord/ExperienceTable";
import { Box, Typography } from "@mui/material";
function ExperienceDetail() {
  return (
    <Box sx={{ border: "3px solid #111", p: "10px 32px 32px 32px" }}>
      <h2>경험치</h2>

      <ExperienceIndicator />
      <ExperienceTable />
    </Box>
  );
}

export default ExperienceDetail;
