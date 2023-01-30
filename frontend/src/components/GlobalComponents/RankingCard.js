import React from "react";

import leaf_left from "assets/leaf_left.png";
import leaf_right from "assets/leaf_right.png";
import { Box, Grid, Typography } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function RankingCard({ rankInfo }) {
  const { type, nickname, user_id } = rankInfo;

  let transKorean = "";
  let bgColor = "";
  let unit = "";
  if (type === "sungsil") {
    transKorean = "성실";
    bgColor = "#FFD704";
    unit = "경험치";
  } else if (type === "ddabong") {
    transKorean = "따봉";
    bgColor = "#3C90F2";
    unit = "개";
  } else if (type === "suda") {
    transKorean = "수다";
    bgColor = "#67C73A";
    unit = "분";
  } else {
    transKorean = "인기";
    bgColor = "#dddddd";
    unit = "명";
  }

  return (
    <>
      <Grid item xs={3} sx={{}}>
        <Box
          sx={{
            border: "3px solid #111",
            height: "360px",
            backgroundColor: bgColor,
            position: "relative",
          }}
        >
          <img
            src="https://cdn.vox-cdn.com/thumbor/B9HHx8vQRoUtBJA8vcuT8WhNrOU=/0x0:5242x3495/1200x800/filters:focal(2029x1954:2867x2792)/cdn.vox-cdn.com/uploads/chorus_image/image/64897255/shutterstock_204525697.0.jpg"
            css={css`
              display: block;
              width: 205px;
              height: 205px;
              border-radius: 200px;
              border: 3px solid #111;
              margin-top: 24px;
              margin-left: calc((100% - 205px) / 2);
            `}
            alt="userimage"
          />
          <img
            src={leaf_left}
            alt="leaf"
            css={css`
              display: block;
              position: absolute;
              top: 35%;
              left: -1%;
              transform: rotate(-10deg);
            `}
          />
          <img
            src={leaf_right}
            alt="leaf"
            css={css`
              display: block;
              position: absolute;
              top: 35%;
              right: -1%;
              transform: rotate(10deg);
            `}
          />
          <Typography
            variant="h5"
            sx={{ position: "absolute", top: "70%", left: "42%" }}
          >
            {transKorean}왕
          </Typography>
          <Box sx={{ mt: "64px", textAlign: "center" }}>
            <span>
              {nickname}#{user_id} 500{unit}
            </span>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
