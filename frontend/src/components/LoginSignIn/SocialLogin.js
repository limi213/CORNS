import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import google_icon from "assets/google_icon.png";
import axios from "axios";

function SocialLogin() {
  
  const openModal = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.get(`${process.env.REACT_APP_HOST}/user/login/auth/google`)
      // const response = await axios.get('/user/login/auth/google')
      if (response.status === 200) {
        console.log(response)
      }
    } catch(e) {
      console.log(e);
    }
  }

  
  return (
    <Box sx={{ width: "80%" }}>
      <h5
        css={css`
          font-size: 20px;
        `}
      >
        소셜 로그인
      </h5>
      <Button
        sx={{
          backgroundColor: "#98DA7A",
          color: "#111111",
          width: "100%",
          height: "40px",
        }}
        onClick={openModal}
      >
        <img
          src={google_icon}
          alt="google"
          css={css`
            margin-right: 3%
          `}
        />
        구글로 로그인하기
      </Button>
    </Box>
  );
}

export default SocialLogin;
