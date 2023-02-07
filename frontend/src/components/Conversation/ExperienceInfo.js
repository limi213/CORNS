import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProgressBar from "../../components/Conversation/ProgressBar";
import ExpInfo from "../../components/Conversation/ExpInfo";
import Box from "@mui/material/Box";
import { getExpProgressBar } from "store/reducers/expProgressBarReducer";

function ExperienceInfo({}) {
  const dispatch = useDispatch();
  const expInfo = useSelector((state) => state.expProgressBarReducer);

  useEffect(() => {
    dispatch(getExpProgressBar());
  }, [dispatch]);

  const { expTotal } = expInfo;

  const { startExp, endExp, levelNo } = expInfo.level;
  let expPercent = 0;
  if (expTotal === 0) {
    expPercent = 0;
  } else {
    expPercent = parseInt(((expTotal - startExp) / (endExp - startExp)) * 100);
  }

  return (
    <>
      <h5>경험치</h5>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <ExpInfo level={levelNo} exp={startExp} />
        <ProgressBar percent={expPercent} color={"#FFC804"} />
        <ExpInfo level={levelNo + 1} exp={endExp} />
      </Box>
    </>
  );
}

export default ExperienceInfo;
