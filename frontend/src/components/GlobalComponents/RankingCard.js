import React from "react";

import leaf_left from "assets/leaf_left.png";
import leaf_right from "assets/leaf_right.png";
import { Box, Grid } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function RankingCard({}) {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Box
            sx={{
              border: "3px solid #111",
              height: "360px",
              backgroundColor: "#FFD704",
              positon: "relative",
            }}
          >
            <img src={leaf_left} alt="leaf" />
            <img
              src="https://cdn.vox-cdn.com/thumbor/B9HHx8vQRoUtBJA8vcuT8WhNrOU=/0x0:5242x3495/1200x800/filters:focal(2029x1954:2867x2792)/cdn.vox-cdn.com/uploads/chorus_image/image/64897255/shutterstock_204525697.0.jpg"
              css={css`
                width: 205px;
                height: 205px;
                border-radius: 200px;
                border: 3px solid #111;
              `}
            />
            <img src={leaf_right} alt="leaf" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
