import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { HandThumbsUp } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ParticipantCard({ participant }) {
  const { img_url, nickname, user_id, thumbs, ignition, script } = participant;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "320px",
          height: "340px",
          padding: "24px 0 18px",
          boxSizing: "border-box",
          backgroundColor: "#fff",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "197px",
            width: "197px",
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
            backgroundColor: "#fff",
            border: "3px solid #111",
            p: "5px 11px",
          }}
        >
          <HandThumbsUp
            css={css`
              font-size: 24px;
              margin-right: 8px;
            `}
          />
          <span>{thumbs}</span>
        </Box>
      </Card>
    </>
  );
}

export default ParticipantCard;
