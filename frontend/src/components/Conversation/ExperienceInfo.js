import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

import ProgressBar from "../../components/Conversation/ProgressBar";
import ExpInfo from "../../components/Conversation/ExpInfo";
import Box from "@mui/material/Box";
import useAxios from "auth/useAxios";
// import { getExpProgressBar } from "store/reducers/expProgressBarReducer";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
      <div>
        <p
          css={css`
            margin: 0;
            font-size: 20px;
            font-weight: bold;
          `}
        >
          경험치
        </p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            my: "1.5rem",
          }}
        >
          <ExpInfo level={levelNo} exp={startExp} />
          <ProgressBar percent={expPercent} color={"#FFC804"} />
          <ExpInfo level={levelNo + 1} exp={endExp} />
        </Box>
      </div>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default ExperienceInfo;
