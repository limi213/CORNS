import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HandThumbsUp } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ParticipantScriptCard({ participant, cardWidth }) {
  const { img_url, nickname, user_id, thumbs, ignition, script } = participant;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          // // height: "480px",
          pt: "24px",
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
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "3px solid #111",
              p: "5px 11px",
              margin: "0 20px 0 0",
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
          <span>발화량: {ignition}(%)</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "265px",
            gap: "8px",
            margin: "38px 0",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFC804", color: "#111111" }}
          >
            스크립트 보기
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#024A9E" }}>
            스크립트 다운
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default ParticipantScriptCard;
