import React from "react";

import ProgressBar from "../../components/Conversation/ProgressBar";
import ExpInfo from "../../components/Conversation/ExpInfo";
import Box from "@mui/material/Box";

function ExperienceInfo({}) {
  const userInfo = {
    currentLevel: 27,
    currentExp: 1980,
    nextExp: 2100,
  };

  const { currentLevel, currentExp, nextExp } = userInfo;

  return (
    <>
      <h5>경험치</h5>
      <Box sx={{ display: "flex" }}>
        <ExpInfo level={currentLevel} exp={currentExp} />
        <ProgressBar color={"#FFC804"} percent={70} />
        <ExpInfo level={currentLevel + 1} exp={nextExp} />
      </Box>
    </>
  );
}

export default ExperienceInfo;
