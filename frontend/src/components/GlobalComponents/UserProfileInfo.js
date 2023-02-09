import React from "react";

import { Box, Typography, Grid } from "@mui/material";
import ProfileImg from "./ProfileImg";

function UserProfileInfo({ basicInfo }) {
  const {
    userId,
    email,
    nickname,
    imgUrl,
    expTotal,
    levelNo,
    friendTotal,
    social,
    attendTotal,
    speakingTotal,
    thumbTotal,
    google,
  } = basicInfo;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: "64px 48px",
        }}
      >
        <Box sx={{ mr: "135px" }}>
          <ProfileImg imgSrc={imgUrl} nickname={nickname} width={"110%"} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Typography variant="h5">
            {nickname}#{userId}
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography>Lv.{levelNo}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{expTotal}exp</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>친구수{friendTotal}명</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography>누적 출석수 {attendTotal}일</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>누적 칭찬수 {thumbTotal}개</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>누적 발화량 {speakingTotal}분</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default UserProfileInfo;