import React, { useEffect } from "react";
import axios from "axios";
import useAxios from "auth/useAxios";
import { useDispatch } from "react-redux";
import { getFriendListAxios } from "store/reducers/friendListReducer";
import { Button } from "@mui/material";


// 이미 친구인 상태
// click하면 친구끊기
function FriendBtnThree({ fromId, toId, setRelation }) {
  const dispatch = useDispatch();
  const { status, sendRequest } = useAxios();

  // 끊기
  const deleteHandler = (fromId, toId) => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/friend/delete`,
      method: "POST",
      data: {
        fromId: fromId,
        toId: toId,
      },
    });
  };

  useEffect(() => {
    if (status === 200) {
      if (setRelation) {
        setRelation(0);
      }
      if (window.location.pathname.includes("friends")) {
        dispatch(getFriendListAxios());
      }
    }
  });

  return (
    <Button
      sx={{
        border: "3px solid #111",
        color: "#111111",
        backgroundColor: "#FFC804",
      }}
      onClick={() => deleteHandler(fromId, toId)}
    >
      친구끊기
    </Button>
  );
}

export default FriendBtnThree;
