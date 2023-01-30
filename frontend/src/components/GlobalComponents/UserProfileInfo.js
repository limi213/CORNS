import React from "react";

import { Box, CardMedia, Container, Typography, Grid } from "@mui/material";

function UserProfileInfo({ basicInfo }) {
  const {
    img_url,
    nickname,
    id,
    level,
    exp,
    friendCnt,
    totalDay,
    totalDdabong,
    totalTalk,
  } = basicInfo;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          boxSizing: "border-box",
          padding: "4rem 3rem",
        }}
      >
        <CardMedia
          component="img"
          image={img_url}
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
            {nickname}#{id}
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography>Lv.{level}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{exp}exp</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>친구수{friendCnt}명</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography>누적 출석수 {totalDay}일</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>누적 칭찬수 {totalDdabong}개</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>누적 발화량수 {totalTalk}분</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default UserProfileInfo;
