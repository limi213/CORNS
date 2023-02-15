import React from "react";

import ProfileImg from "./ProfileImg";
import leaf_left from "assets/leaf_left.png";
import leaf_right from "assets/leaf_right.png";
import { Box, Grid, Typography } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function RankingCard({ rankInfo, customWidth }) {
  const { rankType, userId, nickname, imgUrl, levelNo, value } = rankInfo;

  let transKorean = "";
  let bgColor = "";
  let unit = "";
  if (rankType === 1) {
    transKorean = "성실";
    bgColor = "#FFD704";
    unit = "exp";
  } else if (rankType === 2) {
    transKorean = "수다";
    bgColor = "#67C73A";
    unit = "분";
  } else if (rankType === 3) {
    transKorean = "따봉";
    bgColor = "#3C90F2";
    unit = "개";
  } else {
    transKorean = "인기";
    bgColor = "#dddddd";
    unit = "명";
  }

  const width = customWidth.toString() + "px";

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
            src={leaf_left}
            alt="leaf"
            css={css`
              width: ${customWidth / 1.5}px;
              position: absolute;
              top: 35%;
              left: -2%;
            `}
          />
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 32px;
            `}
          >
            <ProfileImg imgSrc={imgUrl} nickname={nickname} width={width} border={"3px solid #111"}/>
          </div>
          <img
            src={leaf_right}
            alt="leaf"
            css={css`
              width: ${customWidth / 1.5}px;
              position: absolute;
              top: 35%;
              right: -2%;
            `}
          />
          <p
            css={css`
              font-size: 28px;
              font-weight: bold;
              margin: 0;
              text-align: center;
              margin-top: 16px;
            `}
          >
            {transKorean}왕
          </p>
          <Box
            sx={{
              mt: "16px",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <span>
              {nickname}#{userId}
            </span>
            <span
              css={css`
                color: red;
                margin-left: 8px;
              `}
            >
              {rankType === 2 ? Math.round(value / 60) : value} {unit}
            </span>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
