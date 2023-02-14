import React from "react";

import { Box, Typography, Grid } from "@mui/material";
import ProfileImg from "./ProfileImg";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
          p: "20px 30px 50px 30px",
        }}
      >
        <Box sx={{ ml: "5%" }}>
          <img
            src={imgUrl}
            alt={nickname}
            css={css`
                width: 200px;
                height: 200px;
                object-fit: contain;
                border-radius: 50%;
                border: 3px solid black;
              `}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
            ml: "10%",
            fontWeight: "bold",
            fontSize: "18px"
          }}
        >
          <span>
            <span css={css`font-size: 30px;`}>{nickname}</span> <span css={css`font-size: 20px;`}>#{userId}</span>
          </span>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <p>Lv.{levelNo}</p>
            </Grid>
            <Grid item xs={4}>
              <p>{expTotal}exp</p>
            </Grid>
            <Grid item xs={4}>
              <p>친구수{friendTotal}명</p>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <p>누적 출석수 {attendTotal}일</p>
            </Grid>
            <Grid item xs={4}>
              <p>누적 칭찬수 {thumbTotal}개</p>
            </Grid>
            <Grid item xs={4}>
              <p>누적 발화량 {Math.round(speakingTotal / 60)}분</p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default UserProfileInfo;
