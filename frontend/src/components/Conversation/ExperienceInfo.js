import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

import ProgressBar from "../../components/Conversation/ProgressBar";
import ExpInfo from "../../components/Conversation/ExpInfo";
import Box from "@mui/material/Box";
import useAxios from "auth/useAxios";
// import { getExpProgressBar } from "store/reducers/expProgressBarReducer";

function ExperienceInfo({}) {
  const { data, status, isLoading, sendRequest } = useAxios();
  const userId = sessionStorage.getItem("userId");
  // const dispatch = useDispatch();
  // const expInfo = useSelector((state) => state.expProgressBarReducer);
  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/growth/exp/bar/${userId}`,
    });
  }, []);
  // useEffect(() => {
  //   dispatch(getExpProgressBar());
  // }, [dispatch]);

  if (!isLoading && status === 200) {
    const { expTotal } = data;

    const { startExp, endExp, levelNo } = data?.level;
    let expPercent = 0;
    if (expTotal === 0) {
      expPercent = 0;
    } else {
      expPercent = parseInt(
        ((expTotal - startExp) / (endExp - startExp)) * 100
      );
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
  } else {
    return <p>loading 중...</p>;
  }
}

export default ExperienceInfo;
