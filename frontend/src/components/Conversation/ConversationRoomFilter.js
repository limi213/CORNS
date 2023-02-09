import { React, useState } from "react";
import { useDispatch } from "react-redux";
import SubjectsContainer from "store/containers/SubjectsContainer";
import {
  modifyMinTime,
  modifyMaxTime,
  modifyIsAvail,
} from "store/reducers/roomFilterReducer";
import { Box, Checkbox, Button, Input } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ConversationRoomFilter() {
  const dispatch = useDispatch();

  const getMintime = (e) => {
    checkFilter("min", e.target.value);
  };

  const getMaxtime = (e) => {
    checkFilter("max", e.target.value);
  };

  const getAvail = (e) => {
    checkFilter("avail", e.target.value);
  };

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
        }}
      >
        <Box sx={{ mb: "48px" }}>
          <span
            css={css`
              margin-right: 64px;
            `}
          >
            주제
          </span>
          <SubjectsContainer />
        </Box>

        <Box sx={{ mb: "48px" }}>
          <span
            css={css`
              margin-right: 64px;
            `}
          >
            시간
          </span>
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
        </Box>
        <Box sx={{ mb: "48px", mr: "64px" }}>
          <span
            css={css`
              margin-right: 64px;
            `}
          >
            입장가능여부
          </span>
          <Checkbox />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
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
        </Box>
      </Box>
    </>
  );
}

export default ConversationRoomFilter;
