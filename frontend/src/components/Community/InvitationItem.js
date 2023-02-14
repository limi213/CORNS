import React, { useEffect } from "react";
import useAxios from "auth/useAxios";

import ProfileImg from "components/GlobalComponents/ProfileImg";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Stopwatch, People } from "react-bootstrap-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 방 입장하기 -> 초대하기 링크로 이동
const enterRoom = (roomNo) => {
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
  window.location.href = url;
};

function InvitationItem({ inviteNo, user, room, setInviteList }) {
  const { userId, nickname, imgUrl } = user;
  const { roomNo, title, time, maxMember, subjectValue } = room;

  // 방 삭제 axios
  const { data, status, sendRequest } = useAxios();

  const handleDelete = () => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/invitation/${inviteNo}`,
      method: "DELETE",
    });
  };

  useEffect(() => {
    if (status === 200) {
      setInviteList((prev) => prev.filter((item) => item.inviteLogNo !== inviteNo));
    }
  }, [status]);

  return (
    <Box
      sx={{
        borderRadius: "15px",
        border: "2px solid black",
        height: "100px",
        boxShadow: "5px gray",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ ml: "100px", width: "90px" }}>
        <ProfileImg imgSrc={imgUrl} nickname={nickname} width={"70px"} />
      </Box>

      <Box sx={{ ml: "40px", width: "140px" }}>
        <h4
          css={css`
            margin: 0;
          `}
        >
          {nickname}
        </h4>
        <span
          css={css`
            margin-bottom: 20px;
          `}
        >
          #{userId}
        </span>
      </Box>

      <Box sx={{ ml: "40px", width: "200px" }}>
        <h4>{title}</h4>
      </Box>

      <Box sx={{ ml: "60px", width: "80px" }}>{subjectValue}</Box>

      <Box sx={{ ml: "60px", width: "120px" }}>
        <span>
          <Stopwatch /> {time}분
        </span>
        <span
          css={css`
            margin-left: 10px;
          `}
        >
          <People /> {maxMember}명
        </span>
      </Box>

      <Box sx={{ ml: "90px", width: "90px" }}>
        <Button
          sx={{
            border: "2px solid #111",
            color: "#111111",
            backgroundColor: "#FFC804",
            width: "82px",
            height: "38px",
          }}
          onClick={() => enterRoom(roomNo)}
        >
          입장하기
        </Button>
      </Box>

      <IconButton sx={{ ml: "80px" }} onClick={() => handleDelete()}>
        <DeleteIcon color="error" className="deleteButton" fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default InvitationItem;
