import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import ProgressBar from "../../components/Conversation/ProgressBar";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getAttendProgressBar } from "store/reducers/attendProgressBarReducer";

function AttendanceInfo({}) {
  const dispatch = useDispatch();
  const attendInfo = useSelector((state) => state.attendProgressBarReducer);

  useEffect(() => {
    dispatch(getAttendProgressBar());
  }, [dispatch]);

  const { attendanceRate } = attendInfo;

  return (
    <>
      <h5>이번달 출석률</h5>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "55px",
            height: "55px",
            border: "3px solid #111",
            borderRadius: "50%",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <p
            css={css`
              margin-top: 15px;
              font-size: 1rem;
              line-height: 1;
            `}
          >
            0%
          </p>
        </Box>
        <ProgressBar percent={attendanceRate} color={"#45971E"} />
        <Box
          sx={{
            width: "55px",
            height: "55px",
            border: "3px solid #111",
            borderRadius: "50%",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <p
            css={css`
              margin-top: 15px;
              font-size: 1rem;
              line-height: 1;
            `}
          >
            100%
          </p>
        </Box>
      </Box>
    </>
  );
}

export default AttendanceInfo;
