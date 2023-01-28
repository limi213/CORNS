import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function RequestCard({ user }) {
  const { img_url, nickname, user_id } = user;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "240px",
          height: "260px",
          padding: "16px 30px",
          boxSizing: "border-box",
          border: "3px solid #111111"
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "128px",
            width: "128px",
            borderRadius: "200px",
            border: "3px solid #111",
          }}
          image={img_url}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography component="div" sx={{ fontSize: 18, p: "16px" }}>
            {nickname}#{user_id}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            sx={{
              border: "3px solid #111",
              color: "#111111",
              backgroundColor: "#FFC804",
              width: "82px",
              height: "38px",
            }}
          >
            수락
          </Button>
          <Button
            sx={{
              border: "3px solid #111",
              color: "#111111",
              width: "82px",
              height: "38px",
            }}
          >
            거절
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default RequestCard;