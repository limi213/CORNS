import React from "react";
import SigninCard from "components/LoginSignIn/SigninCard";
import AgreeCard from "components/LoginSignIn/AgreeCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import backgroundImage from "../assets/backgroundImage.png";

function Signin() {
  return (
    <Box
      sx={{
        margin: "64px 0 49px 0",
        padding: "54px 0px 58px 250px",
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <AgreeCard />
        </Grid>
        <Grid item xs={5}>
          <SigninCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Signin;
