import React from 'react';
import LoginCard from 'components/LoginSignIn/LoginCard';
import Box from '@mui/material/Box'
import Grid from "@mui/material/Grid";

import backgroundImage from '../assets/backgroundImage.png'

function Login() {
  return (
    <Box sx={{margin: "64px 0 49px 0", padding: "54px 0px 58px 250px", backgroundImage: `url(${backgroundImage})`}}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <LoginCard />
          </Grid>
        </Grid>      
    </Box>
  );
}

export default Login;
