import React, { useState } from "react";

import SigninCard from "components/LoginSignin/SigninCard";
import AgreeCard from "components/LoginSignin/AgreeCard";
import { Box, Grid } from "@mui/material";

import backgroundImage from "../assets/backgroundImage.png";

function Signin() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

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
          <AgreeCard
            checked1={checked1}
            setChecked1={setChecked1}
            checked2={checked2}
            setChecked2={setChecked2}
          />
        </Grid>
        <Grid item xs={5}>
          <SigninCard checked1={checked1} checked2={checked2} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Signin;
