import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

// 친구 끊기 axios
const deleteFriend = async (fromId, toId, setRelation) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/friend/delete`,
      {
        fromId: fromId,
        toId: toId,
      }
    );
    if (response.status === 200) {
      setRelation(0);
    }
  } catch (e) {
    console.log(e);
  }
};

// 이미 친구인 상태
// click하면 친구끊기
function FriendBtnThree({ fromId, toId, setRelation }) {
  return (
    <Button
      sx={{
        border: "3px solid #111",
        color: "#111111",
        backgroundColor: "#FFC804",
      }}
      onClick={() => deleteFriend(fromId, toId, setRelation)}
    >
      친구끊기
    </Button>
  );
}

export default FriendBtnThree;
