import React from "react";
import { useSelector } from "react-redux";

import UserCard from "./UserCard";
import UserInfo from "./UserInfo";

import Grid from "@mui/material/Grid";

function LogInUserArea() {
  const expInfo = useSelector((state) => state.expProgressBarReducer);
  const { userId, nickname } = sessionStorage;
  const { levelNo } = expInfo.level;

  return (
    <Grid container sx={{ marginBottom: "64px" }}>
      <Grid item xs={5} sx={{ pr: "1.5rem" }}>
        <UserCard id={userId} nickname={nickname} level={levelNo} />
      </Grid>
      <Grid item xs={7}>
        <UserInfo />
      </Grid>
    </Grid>
  );
}

export default LogInUserArea;
