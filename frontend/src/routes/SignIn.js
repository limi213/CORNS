import React, {useState} from "react";

import SigninCard from "components/LoginSignIn/SigninCard";
import AgreeCard from "components/LoginSignIn/AgreeCard";
import {Box, Grid} from "@mui/material";

import backgroundImage from "../assets/backgroundImage.png";

function Signin() {
  const [checked, setChecked] = useState(false);
  
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
          <AgreeCard checked={checked} setChecked={setChecked}/>
        </Grid>
        <Grid item xs={5}>
          <SigninCard checked={checked}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Signin;
