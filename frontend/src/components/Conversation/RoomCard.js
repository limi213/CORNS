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
          cursor: "pointer",
        }}
        variant="outlined"
        onClick={() => {
          if (IsLogin()) {
            window.location.href = url;
          } else alert("로그인이 필요한 서비스입니다.");
        }}
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
        <CardContent sx={{ height: "100px", p: "0 16px" }}>
          <div
            css={css`
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              white-space: normal;
              margin: 8px 0;
              font-size: 20px;
              font-weight: bold;
              height: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {title}
          </div>
          <p
            variant="body2"
            css={css`
              margin: 8px 0;
              display: flex;
              justify-content: space-between;
            `}
          >
            <span>
              <Stopwatch /> {time}분
            </span>
            <span>
              <People /> {currentMember} / {maxMember}명
            </span>
          </p>
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
              backgroundColor: "#98DA7A",
            },
            fontFamily: "'Noto Sans KR', sans-serif",

            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          입장하기
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
        <CardContent sx={{ height: "100px", p: "0 16px" }}>
          <p
            component="div"
            css={css`
              margin: 8px 0;
              font-size: 20px;
              font-weight: bold;
              height: 50px;
            `}
          >
            {title}
          </p>
          <p
            variant="body2"
            css={css`
              margin: 8px 0;
              display: flex;
              justify-content: space-between;
            `}
          >
            <span>
              <Stopwatch /> {time}분
            </span>
            <span>
              <People /> {currentMember} / {maxMember}명
            </span>
          </p>
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
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          입장할 수 없는 방
        </Button>
      </Card>
    );
  }
}

export default RoomCard;
