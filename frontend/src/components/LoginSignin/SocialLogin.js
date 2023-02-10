import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import google_icon from "assets/google_icon.png";

function SocialLogin() {
  const googleLogin = (e) => {
    e.preventDefault();
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.REACT_APP_GOOGLE_SCOPE}`;
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <Box sx={{ width: "80%" }}>
      <h5
        css={css`
          font-size: 20px;
          margin: 0 0 16px;
        `}
      >
        소셜 로그인
      </h5>
      <Button
        sx={{
          backgroundColor: "#98DA7A",
          color: "#111",
          width: "100%",
          height: "60px",
          border: "3px solid #111",
          boxSizing: "border-box",
          borderRadius: 0,
          fontSize: "18px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#67C73A",
          },
        }}
        onClick={googleLogin}
      >
        <img
          src={google_icon}
          alt="google"
          css={css`
            margin-right: 3%;
          `}
        />
        구글로 로그인하기
      </Button>
    </Box>
  );
}

export default SocialLogin;
