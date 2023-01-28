import React from "react";

import sungsil_crown from "assets/sungsil_crown.png";
import ddabong_crown from "assets/ddabong_crown.png";
import suda_crown from "assets/suda_crown.png";
import ingi_crown from "assets/ingi_crown.png";
import { Box, Grid, Typography } from "@mui/material";

function UserProfileRankingCard({ ranking }) {
  const { type, rank, indicate } = ranking;

  let crown = "";
  let unit = "";
  let transKorean = "";

  if (type === "sungsil") {
    crown = sungsil_crown;
    unit = "exp";
    transKorean = "성실";
  } else if (type === "ddabong") {
    crown = ddabong_crown;
    unit = "개";
    transKorean = "따봉";
  } else if (type === "suda") {
    crown = suda_crown;
    unit = "분";
    transKorean = "수다";
  } else {
    crown = ingi_crown;
    unit = "개";
    transKorean = "인기";
  }

  return (
    <Grid item xs={3}>
      <Box sx={{ border: "3px solid #111" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={crown} alt={type} />
          <Typography>{transKorean}왕</Typography>
        </Box>
        {rank !== null ? <p>{rank} 위</p> : <p>랭크되지 못했어요</p>}
        <p>{type}</p>
        <p>
          {indicate} {unit}
        </p>
      </Box>
    </Grid>
  );
}

export default UserProfileRankingCard;
