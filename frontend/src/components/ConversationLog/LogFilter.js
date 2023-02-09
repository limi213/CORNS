import React from "react";
import SubjectsContainer from "store/containers/SubjectsContainer";
import SelfEvaluationFilter from "components/ConversationLog/SelfEvaluationFilter";

import {
  Checkbox,
  Box,
  FormControlLabel,
  Button,
  Input,
} from "@mui/material";


/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function LogFilter() {

  return (
    <Box
      component="form"
      sx={{
        border: "3px solid #111",
        backgroundColor: "#FFD704",
        p: "32px",
      }}
    >
      
      {/* 주제 */}
      <Box sx={{ mb: "48px", display: "flex"}}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          주제
        </span>
        <SubjectsContainer />
      </Box>

      {/* 시간 */}
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
          placeholder="5"
          sx={{
            backgroundColor: "#fff",
            border: "3px solid #111",
            pl: "1rem",
            mr: "1rem",
            width: "128px",
            height: "45px",
          }}
        />
        <span
          css={css`
            margin-right: 1rem;
          `}
        >
          최대시간(분)
        </span>
        <Input
          placeholder="30"
          sx={{
            backgroundColor: "#fff",
            border: "3px solid #111",
            pl: "1rem",
            width: "128px",
            height: "45px",
          }}
        />
      </Box>

      {/* 날짜 */}
      <Box sx={{ mb: "48px" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          날짜
        </span>
        <input
          type="date"
          css={css`
            height: 23px;
            padding: 10px;
            font-size: 14px;
            border: 3px solid #111;
          `}
        />
        <span
          css={css`
            margin: 20px;
            font-size: 20px;
          `}
        >
          ~
        </span>
        <input
          type="date"
          css={css`
            height: 23px;
            padding: 10px;
            font-size: 14px;
            border: 3px solid #111;
          `}
        />
      </Box>

      {/* 자기평가 */}
      <Box sx={{ mb: "48px", display: "flex" }}>
        <span
          css={css`
            margin-right: 35px;
          `}
        >
          자기평가
        </span>
        <SelfEvaluationFilter />
      </Box>

      {/* 따봉뱃지 */}
      <Box sx={{ mb: "48px" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          따봉뱃지
        </span>
        <FormControlLabel control={<Checkbox />} label="있음" />
        <FormControlLabel control={<Checkbox />} label="없음" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          variant="contained"
          sx={{
            border: "3px solid #111",
            borderRadius: "0",
            backgroundColor: "#3C90F2",
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
  );
}

export default LogFilter;
