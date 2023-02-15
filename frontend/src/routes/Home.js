import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "auth/GoogleLogin";
import Navbar from "../components/GlobalComponents/Navbar";
import hero from "assets/hero.png";
import textImg from "assets/main_page_text.png";
import backgroundImage from "assets/backgroundImage.png";
import MainConversation from "components/Home/MainConversation";
import RankingList from "components/GlobalComponents/RankingList";
import IsLogin from "auth/IsLogin";
import Footer from "components/GlobalComponents/Footer";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Box, Button, Grid, Typography } from "@mui/material";
import { ChevronDoubleRight } from "react-bootstrap-icons";

function Home() {
  // 소셜 로그인시 리디랙션 된건지 확인
  useEffect(() => {
    if (window.location.href.includes("code")) {
      const code = new URL(window.location.href).searchParams.get("code");
      GoogleLogin(code);
    }
  });

  return (
    <div>
      <div
        css={css`
          height: auto;
          min-height: 100%;
          padding-bottom: 35vh;
        `}
      >
        <Navbar />
        <Box
          sx={{
            width: "100%",
            height: "850px",
            backgroundImage: `url(${hero})`,
            backgroundSize: "120%",
            backgroundPosition: "top 15% left 0% ",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
          }}
        >
          <Box sx={{ position: "absolute", top: "35%", left: "10%" }}>
            <h1
              css={css`
                font-size: 48px;
                margin: 16px 0;
                text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
              `}
            >
              CORNS가 처음이세요?
            </h1>
            <p
              css={css`
                color: #fff;
                text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
                font-size: 24px;
              `}
            >
              CORNS 사용법 더 알아보러가기
            </p>
            <Button
              variant="contained"
              sx={{
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
                to="/tutorial"
                css={{
                  color: "#111",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontFamily: "Noto Sans KR",
                }}
              >
                튜토리얼 보기
              </Link>
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: "850px" }}>
          <Box sx={{ mx: "105px" }}>
            <Box sx={{ mt: "64px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  css={css`
                    margin: 0;
                    font-size: 32px;
                    font-weight: bold;
                  `}
                >
                  쫑알룸
                </p>
                <Link
                  to="/conversation"
                  css={{
                    color: "#111",
                    textDecoration: "none",
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  더보기
                  <ChevronDoubleRight
                    css={css`
                      color: #ffc804;
                      margin-left: 16px;
                    `}
                  />
                </Link>
              </Box>
              <MainConversation />
            </Box>
            <Box sx={{ mt: "64px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "64px",
                }}
              >
                <p
                  css={css`
                    margin: 0;
                    font-size: 32px;
                    font-weight: bold;
                  `}
                >
                  랭킹
                </p>
                <Link
                  to="/community/ranking/sincerity"
                  css={{
                    color: "#111",
                    textDecoration: "none",
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  더보기
                  <ChevronDoubleRight
                    css={css`
                      color: #ffc804;
                      margin-left: 16px;
                    `}
                  />
                </Link>
              </Box>
              <RankingList width={200} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "850px",
              padding: "32px 105px",
              boxSizing: "border-box",
              backgroundImage: `url(${backgroundImage})`,
              mt: "64px",
            }}
          >
            <Box
              sx={{
                pr: "64px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                fontSize: "34px",
                fontWeight: "bold",
                textShadow: "4px 4px 4px white"
              }}
            >
              <p>외국어로 대화를 하는 것에 어려움을 느끼고 계신가요?</p>
              <p>독해는 잘 되는데 말이 잘 안나오시나요?</p>
              <p>그런 당신을 위한 서비스가 있습니다.</p>
              <p>외국어 연습에 최적화된 CORNS를 만나보세요!</p>
            </Box>
            <Box
              sx={{
                backgroundColor: "#fff",
                width: "50%",
                height: "100%",
                border: "3px solid #111",
                padding: "32px",
                boxSizing: "border-box",
              }}
            >
              <img
                src="https://images.everydayhealth.com/images/ms-and-dysarthria-1440x810.jpg"
                alt="conversation-people"
                css={css`
                  border: 3px solid #111;
                  width: 100%;
                  height: 100%;
                `}
              />
            </Box>
          </Box>
          <Box sx={{ mx: "105px", mt: "64px" }}>
            <img
              src={textImg}
              alt="conversation script"
              css={css`
                width: 100%;
              `}
            />

            <Grid container sx={{ mb: "64px" }}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    height: "500px",
                    mr: "24px",
                    border: "3px solid #111",
                    padding: "32px",
                    boxSizing: "border-box",
                    boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src="https://img.etnews.com/photonews/2009/1334593_20200907161921_819_0001.jpg"
                    alt="conversation people"
                    css={css`
                      border: 3px solid #111;
                      object-fit: cover;
                      height: 100%;
                      width: 100%;
                    `}
                  />
                </Box>

                <p
                  css={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  대화하고
                </p>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    height: "500px",
                    mr: "24px",
                    border: "3px solid #111",
                    padding: "32px",
                    boxSizing: "border-box",
                    boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/GVVu58qmsp6fqvwPdPfpxk.jpg"
                    alt="read script"
                    css={css`
                      border: 3px solid #111;
                      object-fit: cover;
                      height: 100%;
                      width: 100%;
                    `}
                  />
                </Box>
                <p
                  css={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  대화기록을 스크립트로 받아보고
                </p>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    height: "500px",
                    mr: "24px",
                    border: "3px solid #111",
                    padding: "32px",
                    boxSizing: "border-box",
                    boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src="https://jerryjenkins.com/wp-content/uploads/2018/10/Book-Writing-Software-scaled.jpg"
                    alt="evaluate"
                    css={css`
                      border: 3px solid #111;
                      object-fit: cover;
                      height: 100%;
                      width: 100%;
                    `}
                  />
                </Box>

                <p
                  css={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  나에 대한 평가를 기록하며 성장하고
                </p>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {!IsLogin() && (
                <Button
                  variant="contained"
                  sx={{
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
              )}
            </Box>
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
