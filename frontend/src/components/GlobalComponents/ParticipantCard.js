import React from "react";

import { Box, Card, Typography } from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ProfileImg from "./ProfileImg";
import { HandThumbsUp } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ParticipantCard({ participant, myId }) {
  const { imgUrl, nickname, scriptUrl, speaking, thumbCnt, userId } =
    participant;

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
          backgroundColor: myId == userId ? "#FFB800" : "#fff",
          borderRadius: 0,
        }}
      >
        {/* <CardMedia
          component="img"
          sx={{
            height: "197px",
            width: "197px",
            borderRadius: "200px",
            border: "3px solid #111",
          }}
          image={imgUrl}
          alt="user-image"
        /> */}
        <ProfileImg imgSrc={imgUrl} width={200} border={"3px solid #111"} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <div
            css={css`
              font-size: 18px;
              padding: 16px;
            `}
          >
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {nickname}
            </span>{" "}
            <span> #{userId}</span>
          </div>
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
          <span>{thumbCnt}</span>
        </Box>
      </Card>
    </>
  );
}

export default ParticipantCard;
