import { React, useState } from "react";
import { useDispatch } from "react-redux";
import RoomSubjectsContainer from "store/containers/RoomSubjectsContainer";
import {
  modifyMinTime,
  modifyMaxTime,
  modifyIsAvail,
  resetFilter,
} from "store/reducers/roomFilterReducer";
import { Box, Checkbox, Button, Input } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ConversationRoomFilter() {
  const [checked, setChecked] = useState(false);
  const [clickReset, setClickReset] = useState(false);
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(30);
  const dispatch = useDispatch();

  const getMintime = (e) => {
    setMinTime(() => e.target.value);
  };

  const getMaxtime = (e) => {
    setMaxTime(() => e.target.value);
  };

  const sendFilter = () => {
    checkFilter("min", minTime);
    checkFilter("max", maxTime);
  };

  const getAvail = () => {
    setChecked((prev) => !prev);
    checkFilter("avail", checked);
  };

  const reset = () => {
    dispatch(resetFilter(true, "RESET_FILTER"));
    setClickReset(() => true);
    console.log(clickReset);
  };

  const resetSubject = () => {};

  const resetAvail = () => {};
  // 필터 변경할 때마다 params 수정하는 함수
  const checkFilter = (content, e) => {
    if (content === "min") {
      dispatch(modifyMinTime(e, "MODIFY_MIN_TIME"));
    } else if (content === "max") {
      dispatch(modifyMaxTime(e, "MODIFY_MAX_TIME"));
    } else {
      dispatch(modifyIsAvail(e, "MODIFY_AVAIL"));
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          border: "3px solid #111",
          backgroundColor: "#FFD704",
          p: "32px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            mr: "48px",
            pr: "48px",
            borderRight: "3px solid #111",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "font-family: 'Noto Sans KR', sans-serif",
          }}
        >
          <p
            css={css`
              margin: 0 0 64px 0;
            `}
          >
            주제
          </p>
          <p
            css={css`
              margin: 0 0 64px 0;
            `}
          >
            시간
          </p>
          <p>대화시작여부</p>
        </Box>
        <Box>
          <Box sx={{ mb: "48px" }}>
            <RoomSubjectsContainer />
          </Box>

          <Box sx={{ mb: "48px" }}>
            <span
              css={css`
                margin-right: 1rem;
              `}
            >
              최소시간(분)
            </span>
            <Input
              id="outlined-basic"
              placeholder="5"
              sx={{
                backgroundColor: "#fff",
                border: "3px solid #111",
                pl: "1rem",
                mr: "1rem",
                width: "128px",
                height: "45px",
              }}
              onChange={getMintime}
            />
            <span
              css={css`
                margin-right: 1rem;
              `}
            >
              최대시간(분)
            </span>
            <Input
              id="outlined-basic"
              placeholder="30"
              sx={{
                backgroundColor: "#fff",
                border: "3px solid #111",
                pl: "1rem",
                width: "128px",
                height: "45px",
              }}
              onChange={getMaxtime}
            />
            <Button
              variant="contained"
              sx={{
                ml: "16px",
                border: "3px solid #111",
                borderRadius: 0,
                backgroundColor: "#98DA7A",
                color: "#111",
                fontFamily: "'Noto Sans KR', sans-serif",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#BAE8A4",
                },
              }}
              onClick={sendFilter}
            >
              적용
            </Button>
          </Box>
          <Box sx={{ mr: "64px" }}>
            <Checkbox onClick={getAvail} checked={checked} />
          </Box>
          {/* <Box
          sx={{ display: "flex", flexDirection: "row-reverse" }}
          onClick={reset}
        >
          <Button
            variant="contained"
            sx={{
              border: "3px solid #111",
              borderRadius: "0",
              backgroundColor: "#67C73A",
              color: "#111",
              "&:hover": {
                backgroundColor: "#45971E",
              },
            }}
          >
            전체해제
          </Button>
        </Box> */}
        </Box>
      </Box>
    </>
  );
}

export default ConversationRoomFilter;
