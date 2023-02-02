import React from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { Stopwatch, People } from "react-bootstrap-icons";

function RoomCard({ room, subject }) {
  const {
    currentMember,
    hostUserId,
    maxMember,
    roomCd,
    roomNo,
    sessionId,
    time,
    title,
  } = room;
  const { imgUrl, subjectNo, value } = subject;
  return (
    <Card
      sx={{ maxWidth: 265, maxHeight: 320, position: "relative" }}
      variant="outlined"
    >
      <CardMedia
        component="img"
        alt="subject Image"
        height="160"
        image={imgUrl}
      />
      <div
        css={css`
          position: absolute;
          top: 45%;
          left: 0;
          color: blue;
        `}
      >
        {value}
      </div>
      <CardContent sx={{ height: 110 - 32 }}>
        <Typography gutterBottom variant="p" component="div">
          {title}을/를 대화해 봅시다!
        </Typography>
        <Typography variant="body2">
          <span>
            <Stopwatch /> {time}분
          </span>
          <span>
            <People /> {currentMember + 1} / {maxMember}명
          </span>
        </Typography>
      </CardContent>

      <Button
        variant="contained"
        sx={{
          width: "100%",
          height: 50,
          backgroundColor: "#67C73A",
          color: "#111",
        }}
      >
        쫑알룸 입장하기
      </Button>
    </Card>
  );
}

export default RoomCard;
