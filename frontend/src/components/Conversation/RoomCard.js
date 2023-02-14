import React from "react";
import IsLogin from "auth/IsLogin";
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
    roomNo,
    title,
    time,
    currentMember,
    maxMember,
    hostUserId,
    sessionId,
    avail,
  } = room;
  const { imgUrl, subjectNo, value } = subject;

  let url;

  if (
    window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1")
  ) {
    url =
      "https://localhost:5000/src/Room/GoToView.html?" +
      "username=" +
      sessionStorage.getItem("nickname") +
      "&userId=" +
      sessionStorage.getItem("userId") +
      "&jroomno=" +
      roomNo +
      "&accessToken=" +
      sessionStorage.getItem("accessToken");
  } else {
    url =
      "https://corns.co.kr:4435/frontend/src/Room/GoToView.html?" +
      "username=" +
      sessionStorage.getItem("nickname") +
      "&userId=" +
      sessionStorage.getItem("userId") +
      "&jroomno=" +
      roomNo +
      "&accessToken=" +
      sessionStorage.getItem("accessToken");
  }

  let badgeColor = "";

  switch (subjectNo) {
    case 1:
      badgeColor = "#FFA903";
      break;
    case 2:
      badgeColor = "#FFE767";
      break;
    case 3:
      badgeColor = "#98DA7A";
      break;
    case 4:
      badgeColor = "#7DB6FA";
      break;
    case 5:
      badgeColor = "#DDDDDD";
      break;
    default:
      badgeColor = "#FFFFFF";
  }

  if (avail) {
    return (
      <Card
        sx={{
          maxWidth: 265,
          maxHeight: 320,
          position: "relative",
          border: "3px solid #111",
          borderRadius: 0,
        }}
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
            top: 0.5em;
            left: 0.5em;
            background-color: ${badgeColor};
            padding: 1% 10%;
            border: 3px solid #111;
          `}
        >
          {value}
        </div>
        <CardContent sx={{ height: 110 - 32 }}>
          <Typography gutterBottom variant="p" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            <span>
              <Stopwatch /> {time}분
            </span>
            <span>
              <People /> {currentMember} / {maxMember}명
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
            borderTop: "3px solid #111",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "#45971E",
            },
            fontSize: "20px",
          }}
          onClick={() => {
            if (IsLogin()) {
              window.location.href = url;
            } else alert("로그인이 필요한 서비스입니다.");
          }}
        >
          쫑알룸 입장하기
        </Button>
      </Card>
    );
  } else {
    return (
      <Card
        sx={{
          maxWidth: 265,
          maxHeight: 320,
          position: "relative",
          border: "3px solid #111",
          borderRadius: 0,
          opacity: "50%",
        }}
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
            top: 0.5em;
            left: 0.5em;
            background-color: ${badgeColor};
            padding: 1% 10%;
            border: 3px solid #111;
          `}
        >
          {value}
        </div>
        <CardContent sx={{ height: 110 - 32 }}>
          <Typography gutterBottom variant="p" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            <span>
              <Stopwatch /> {time}분
            </span>
            <span>
              <People /> {currentMember} / {maxMember}명
            </span>
          </Typography>
        </CardContent>

        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: 50,
            backgroundColor: "#ddd",
            color: "#111",
            borderTop: "3px solid #111",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "#ddd",
            },
            cursor: "default",
            fontSize: "20px",
          }}
        >
          입장할 수 없는 방
        </Button>
      </Card>
    );
  }
}

export default RoomCard;
