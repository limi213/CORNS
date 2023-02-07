import React from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

// 친구신청 수락 axios
const acceptFriend = async (fromId, toId, setRelation) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/friend/accept`,
      {
        fromId: fromId,
        toId: toId,
      }
    );
    if (response.status === 200) {
      console.log(response);
      setRelation && setRelation(3);
    }
  } catch (e) {
    console.log(e);
  }
};

// 친구신청 거절 axios
const rejectFriend = async (fromId, toId, setRelation) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/friend/reject`,
      {
        fromId: fromId,
        toId: toId,
      }
    );
    if (response.status === 200) {
      console.log(response);
      setRelation && setRelation(0);
    }
  } catch (e) {
    console.log(e);
  }
};


// 친구신청 받은 상태
function FriendBtnTwo({ fromId, toId, setRelation }) {
  return (
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
        onClick={() => acceptFriend(fromId, toId, setRelation)}
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
        onClick={() => rejectFriend(fromId, toId, setRelation)}
      >
        거절
      </Button>
    </Box>
  );
}

export default FriendBtnTwo;
