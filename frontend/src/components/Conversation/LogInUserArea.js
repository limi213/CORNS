import React from "react";

import UserCard from "./UserCard";
import UserInfo from "./UserInfo";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function LogInUserArea() {
  const user = {
    user_id: 100456,
    nickname: "almeang",
    level: 27,
    exp: 1980,
    attend: 30,
  };

  const { user_id, nickname, level, exp, attend } = user;

  return (
    <Grid container sx={{ marginBottom: "64px" }}>
      <Grid item xs={5} sx={{ pr: "1.5rem" }}>
        <UserCard id={user_id} nickname={nickname} level={level} />
      </Grid>
      <Grid item xs={7}>
        <UserInfo exp={exp} attend={attend} />
      </Grid>
    </Grid>
  );
}

export default LogInUserArea;
