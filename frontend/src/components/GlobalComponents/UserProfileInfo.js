import React from "react";

import level1 from "assets/almeng.png";
import level2 from "assets/almeng_level2.png";
import level3 from "assets/almeng_level3.png";
import level4 from "assets/almeng_level4.png";
import level5 from "assets/almeng_level5.png";

import { Box, Typography, Grid } from "@mui/material";

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

  let almeng = "";
  if (levelNo >= 1 && levelNo < 4) {
    almeng = level1;
  } else if (levelNo >= 4 && levelNo < 7) {
    almeng = level2;
  } else if (levelNo >= 7 && levelNo < 10) {
    almeng = level3;
  } else if (levelNo >= 10 && levelNo < 13) {
    almeng = level4;
  } else if (levelNo >= 13) {
    almeng = level5;
  }

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
            fontSize: "18px",
          }}
        >
          <span>
            <span
              css={css`
                font-size: 30px;
              `}
            >
              {nickname}
            </span>{" "}
            <span
              css={css`
                font-size: 20px;
              `}
            >
              #{userId}
            </span>
            <img
              src={almeng}
              css={css`
                width: 50px;
                object-fit: contain;
                margin-left: 20px;
              `}
            />
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
              <p>누적 따봉수 {thumbTotal}개</p>
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
