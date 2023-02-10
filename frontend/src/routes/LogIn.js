import React from "react";
import LoginCard from "components/LoginSignin/LoginCard";
import { Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import backgroundImage from "assets/backgroundImage.png";
import almeng from "assets/almeng.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function Login() {
  return (
    <Box
      sx={{
        margin: "64px 0 49px 0",
        py: "54px ",
        pl: "210px",
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Grid container>
        <Grid item xs={5} sx={{ mr: "64px" }}>
          <LoginCard />
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              border: "3px solid #111",
              height: "100%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: "32px",
              boxSizing: "border-box",
            }}
          >
            <div
              css={css`
                padding-top: 5%;
                border: 3px solid #111;
                width: 80%;
                height: 40%;
                margin-bottom: 15%;
                position: relative;
              `}
            >
              <div
                css={css`
                  width: 0;
                  height: 0;
                  border-bottom: 30px solid transparent;
                  border-top: 50px solid #111;
                  border-left: 30px solid transparent;
                  border-right: 30px solid transparent;
                  position: absolute;
                  bottom: -80px;
                  left: 42%;
                `}
              ></div>
              <div
                css={css`
                  width: 0;
                  height: 0;
                  border-bottom: 30px solid transparent;
                  border-top: 50px solid #fff;
                  border-left: 30px solid transparent;
                  border-right: 30px solid transparent;
                  position: absolute;
                  bottom: -73px;
                  left: 42%;
                `}
              ></div>
              <p
                css={css`
                  text-align: center;
                  color: #111;
                  font-size: 24px;
                `}
              >
                아직도 CORNS에 가입하지 않으셨다구요? <br />
                알맹이가 되어 같이 외국어 연습을 해봐요!
              </p>
              <Button
                variant="contained"
                sx={{
                  ml: "calc((100% - 264px)/2)",
                  mt: "16px",
                  color: "#111",
                  border: "3px solid #111",
                  backgroundColor: "#FFC804",
                  borderRadius: "0",
                  p: "10px 32px",
                  "&:hover": {
                    backgroundColor: "#FFA903",
                  },
                }}
              >
                <Link
                  to="signin"
                  css={css`
                    font-size: 24px;
                    text-decoration: none;
                    color: #111;
                    font-weight: bold;
                  `}
                >
                  CORNS 가입하기
                </Link>
              </Button>
            </div>

            <img
              src={almeng}
              alt="almeang icon"
              css={css`
                width: 50%;
              `}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
