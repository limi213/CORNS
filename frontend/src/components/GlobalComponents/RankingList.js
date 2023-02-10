import React from "react";

import RankingCard from "./RankingCard";
import { Box, Grid, Typography } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function RankingList({ width }) {
  const rankInfos = [
    {
      type: "sungsil",
      nickname: "dorothy",
      user_id: 1180,
      level: 30,
      exp: 1980,
      friendCnt: 10,
      totalDay: 13,
      totalDdabong: 4,
      totalTalk: 123,
    },
    {
      type: "ddabong",
      nickname: "dorothy",
      user_id: 1056,
      level: 30,
      exp: 1980,
      friendCnt: 10,
      totalDay: 13,
      totalDdabong: 4,
      totalTalk: 123,
    },
    {
      type: "suda",
      nickname: "dorothy",
      user_id: 1759,
      level: 30,
      exp: 1980,
      friendCnt: 10,
      totalDay: 13,
      totalDdabong: 4,
      totalTalk: 123,
    },
    {
      type: "ingi",
      nickname: "dorothy",
      user_id: 1002,
      level: 30,
      exp: 1980,
      friendCnt: 10,
      totalDay: 13,
      totalDdabong: 4,
      totalTalk: 123,
    },
  ];

  return (
    <>
      <Grid container spacing={1}>
        {rankInfos.map((rankInfo) => {
          return (
            <RankingCard
              rankInfo={rankInfo}
              key={rankInfo.user_id}
              customWidth={width}
            />
          );
        })}
      </Grid>
    </>
  );
}
