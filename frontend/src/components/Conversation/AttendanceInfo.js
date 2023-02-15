import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import useAxios from "auth/useAxios";
import Box from "@mui/material/Box";
import ProgressBar from "../../components/Conversation/ProgressBar";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import { getAttendProgressBar } from "store/reducers/attendProgressBarReducer";

function AttendanceInfo({}) {
  const { data, status, isLoading, sendRequest } = useAxios();
  const userId = sessionStorage.getItem("userId");
  // const dispatch = useDispatch();
  // const attendInfo = useSelector((state) => state.attendProgressBarReducer);

  // useEffect(() => {
  //   dispatch(getAttendProgressBar());
  // }, [dispatch]);
  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/growth/room/${userId}`,
    });
  }, []);

  if (!isLoading && status === 200) {
    return (
      <div>
        <p
          css={css`
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          `}
        >
          이번달 출석률
        </p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            my: "1.5rem",
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
          <ProgressBar percent={data.attendanceRate} value={`${data.attendanceRate}%`} color={"#45971E"} />
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
      </div>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default AttendanceInfo;
