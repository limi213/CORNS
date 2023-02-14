import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import level1 from "assets/almeng.png";
import level2 from "assets/almeng_level2.png";
import level3 from "assets/almeng_level3.png";
import level4 from "assets/almeng_level4.png";
import level5 from "assets/almeng_level5.png";

function ExpInfo({ level, exp }) {
  let almeng = "";
  if (level >= 1 && level < 4) {
    almeng = level1;
  } else if (level >= 4 && level < 7) {
    almeng = level2;
  } else if (level >= 7 && level < 10) {
    almeng = level3;
  } else if (level >= 10 && level < 13) {
    almeng = level4;
  } else if (level >= 13) {
    almeng = level5;
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "100px",
          height: "100px",
          backgroundImage: `url(${almeng})`,
          backgroundSize: "contain",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Typography sx={{ fontFamily: "Noto Sans KR", textAlign: "center" }}>
        Lv.{level}
      </Typography>
      <Typography sx={{ fontFamily: "Noto Sans KR", textAlign: "center" }}>
        {exp} exp
      </Typography>
    </Box>
  );
}

export default ExpInfo;
