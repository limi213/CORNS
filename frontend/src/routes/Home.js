import { Link } from "react-router-dom";

import Navbar from "../components/GlobalComponents/Navbar";
import hero from "assets/hero.png";
import backgroundImage from "assets/backgroundImage.png";
import RoomList from "components/Conversation/RoomList";
import RankingCard from "components/GlobalComponents/RankingCard";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Box, Button, Grid, Typography } from "@mui/material";

function Home() {
  return (
    <div>
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
            튜도리얼 보기
          </Button>
        </Box>
      </Box>
      <Box sx={{ mx: "105px" }}>
        <Box>
          <Typography variant="h5">쫑알룸</Typography>
          <Link to="/conversation" sx={{ cursor: "pointer" }}>
            더보기
          </Link>
          <RoomList />
        </Box>
        <Box>
          <Typography variant="h5">랭킹</Typography>
          <Link>더보기</Link>
          <RankingCard />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "850px",
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></Box>

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
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{ border: "3px solid #111", height: "500px", mr: "24px" }}
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ border: "3px solid #111", height: "500px" }}></Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
