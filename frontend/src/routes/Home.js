import { Link } from "react-router-dom";
import Navbar from "../components/GlobalComponents/Navbar";
import hero from "assets/hero.png";
import backgroundImage from "assets/backgroundImage.png";
import RoomListsContainer from "redux/containers/RoomListsContainer";
import RankingList from "components/GlobalComponents/RankingList";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Box, Button, Grid, Typography } from "@mui/material";

function Home() {
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
            튜토리얼 보기
          </Button>
        </Box>
      </Box>
      <Box sx={{ mx: "105px" }}>
        <Box>
          <Typography variant="h5">쫑알룸</Typography>
          <Link to="/conversation" sx={{ cursor: "pointer" }}>
            더보기
          </Link>
          <RoomListsContainer />
        </Box>
        <Box>
          <Typography variant="h5">랭킹</Typography>
          <Link to="/community/ranking/sincerity" sx={{ cursor: "pointer" }}>
            더보기
          </Link>
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
        }}
      >
        <Box>
          <Typography variant="h4">대화가 어려우신가요?</Typography>
          <Typography variant="h4">대화가 어려우신가요?</Typography>
          <Typography variant="h4">대화가 어려우신가요?</Typography>
          <Typography variant="h4">대화가 어려우신가요?</Typography>
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
            <Typography variant="h5">안녕하세요</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{ border: "3px solid #111", height: "500px", mr: "24px" }}
            ></Box>
            <Typography variant="h5">반갑습니다</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ border: "3px solid #111", height: "500px" }}></Box>
            <Typography variant="h5">다시 만나요</Typography>
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
