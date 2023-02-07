import React from "react";

import { Box, CardMedia, Typography, Grid } from "@mui/material";

function UserProfileInfo({ basicInfo }) {
  const {
    userId,
    email,
    nickname,
    imgUrl,
    expTotal,
    level,
    friendTotal,
    social,
    isGoogle,
    refreshToken,
    attendTotal,
  } = basicInfo;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: "64px 48px",
        }}
      >
        <CardMedia
          component="img"
          image={imgUrl == null ? "" : null}
          alt={nickname}
          sx={{
            width: "250px",
            borderRadius: "200px",
            border: "3px solid #111",
            mr: "135px",
          }}
        />
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
              <Typography>Lv.{level}</Typography>
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
              <Typography>누적 칭찬수 100개</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>누적 발화량수 100분</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default UserProfileInfo;
