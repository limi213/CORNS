import React from "react";

import ExperienceInfo from "./ExperienceInfo";
import AttendanceInfo from "./AttendanceInfo";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function UserInfo({}) {
  return (
    <Card
      sx={{
        border: "3px solid #111",
        height: "100%",
        boxSizing: "border-box",
        p: "32px 24px",
      }}
    >
      <p
        css={css`
          margin: 0;
          font-size: 20px;
          font-weight: bold;
        `}
      >
        경험치
      </p>
      <ExperienceInfo />
      <AttendanceInfo />
    </Card>
  );
}

export default UserInfo;
