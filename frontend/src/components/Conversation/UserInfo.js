import React from "react";

import ExperienceInfo from "./ExperienceInfo";
import AttendanceInfo from "./AttendanceInfo";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

function UserInfo({}) {
  return (
    <Card sx={{ border: "3px solid #111", height: "100%" }}>
      <ExperienceInfo />
      <AttendanceInfo />
    </Card>
  );
}

export default UserInfo;
