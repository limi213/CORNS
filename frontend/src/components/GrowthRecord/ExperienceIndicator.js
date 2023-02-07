import { React, useEffect } from "react";

import ExperienceInfo from "components/Conversation/ExperienceInfo";
import sungsil_crown from "assets/sungsil_crown.png";
import { Box, Grid, Typography } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ExperienceIndicator({}) {
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Box
            sx={{
              border: "3px solid #111",
              height: "200px",
              mr: "1.5rem",
              p: "2rem",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#FFA903",
                height: "100%",
                p: "1rem",
                boxSizing: "border-box",
                boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "85px",
                  height: "85px",
                  backgroundColor: "#fff",
                  borderRadius: "100px",
                  border: "3px solid #111",
                  mr: "1rem",
                }}
              >
                <img
                  src={sungsil_crown}
                  css={css`
                    width: 48px;
                    height: 48px;
                  `}
                  alt="성실왕관"
                />
              </Box>
              <Typography sx={{ width: "60%" }}>
                Almeang님의 경험치는 상위 20%입니다.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ border: "3px solid #111", height: "200px" }}>
            <ExperienceInfo />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ExperienceIndicator;
