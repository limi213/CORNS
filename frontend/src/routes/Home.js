import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "auth/GoogleLogin";
import Navbar from "../components/GlobalComponents/Navbar";
import hero from "assets/hero.png";
import backgroundImage from "assets/backgroundImage.png";
import RoomListsContainer from "store/containers/RoomListsContainer";
import RankingList from "components/GlobalComponents/RankingList";

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
    <>
      <Navbar />
      <Box
        sx={{ width: "100%", height: "850px", backgroundImage: `url(${hero})` }}
      >
        <Box sx={{ position: "absolute", top: "45%", right: "15%" }}>
          <Typography variant="h3">CORNS가 처음이세요?</Typography>
          <Typography sx={{ color: "#fff" }}>
            CORNS 사용법 더 알아보러가기
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "#111",
              border: "3px solid #111",
              backgroundColor: "#FFC804",
            }}
          >
            <Link
              to="/tutorial"
              css={{
                color: "#111",
                textDecoration: "none",
              }}
            >
              튜토리얼 보기
            </Link>
          </Button>
        </Box>
      </Box>
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
          <RoomListsContainer main={true} />
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
          <RankingList />
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
        <Box sx={{ pr: "64px" }}>
          <p css={{ fontSize: "32px", fontWeight: "bold" }}>
            외국어로 대화를 하는 것에 어려움을 느끼고 계신가요?
          </p>
          <p css={{ fontSize: "32px", fontWeight: "bold" }}>
            독해는 잘 되는데 말이 잘 안나오시나요?
          </p>
          <p css={{ fontSize: "32px", fontWeight: "bold" }}>
            그런 당신을 위한 서비스가 있습니다.
          </p>
          <p css={{ fontSize: "32px", fontWeight: "bold" }}>
            외국어 연습에 최적화된 CORNS를 만나보세요!
          </p>
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "60%",
            height: "100%",
            border: "3px solid #111",
            padding: "32px",
            boxSizing: "border-box",
          }}
        >
          <img
            src="https://img.freepik.com/free-vector/different-people-asking-questions_23-2148934441.jpg"
            alt="conversation-people"
            css={css`
              border: 3px solid #111;
              width: 100%;
              height: 100%;
            `}
          />
        </Box>
      </Box>
      <Box sx={{ mx: "105px" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          conversation
        </Typography>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Script
        </Typography>
        <Grid container>
          <Grid item xs={4}>
            <Box
              sx={{ border: "3px solid #111", height: "500px", mr: "24px" }}
            ></Box>{" "}
            <p css={{ fontSize: "24px", fontWeight: "bold" }}>대화하고</p>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{ border: "3px solid #111", height: "500px", mr: "24px" }}
            ></Box>
            <p css={{ fontSize: "24px", fontWeight: "bold" }}>
              대화기록을 스크립트로 받아보고
            </p>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ border: "3px solid #111", height: "500px" }}></Box>
            <p css={{ fontSize: "24px", fontWeight: "bold" }}>
              나에 대한 평가를 기록하며 성장하고
            </p>
          </Grid>
        </Grid>
        <Button variant="contained">
          <Link
            to="signin"
            css={css`
              text-decoration: none;
              color: #fff;
            `}
          >
            CORNS 가입하기
          </Link>
        </Button>
      </Box>
    </>
  );
}

export default Home;
