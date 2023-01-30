import React from "react";

import SubjectBtn from "../Conversation/SubjectBtn";
import {
  TextField,
  Checkbox,
  Box,
  FormControlLabel,
  Button,
  Input,
} from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function LogFilter() {
  const datas = [
    { id: 1, subject: "일상" },
    { id: 2, subject: "비즈니스" },
    { id: 3, subject: "소개팅" },
    { id: 4, subject: "오픽" },
    { id: 5, subject: "토스" },
    { id: 6, subject: "자유" },
  ];

  const subjectBtn = datas.map((item) => (
    <SubjectBtn active={false} subject={item.subject} key={item.id} />
  ));

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
      <Box sx={{ mb: "48px" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          주제
        </span>
        {subjectBtn}
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
        <input type="date" /> ~ <input type="date" />
      </Box>

      {/* 자기평가 */}
      <Box sx={{ mb: "48px" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          자기평가
        </span>
        <FormControlLabel control={<Checkbox />} label="1" color="default" />
        <FormControlLabel control={<Checkbox />} label="2" />
        <FormControlLabel control={<Checkbox />} label="3" />
        <FormControlLabel control={<Checkbox />} label="4" />
        <FormControlLabel control={<Checkbox />} label="5" />
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
