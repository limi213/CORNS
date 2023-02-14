import React, { useEffect } from "react";
import useAxios from "auth/useAxios";
import { useDispatch } from "react-redux";
import { friendActions } from "store/reducers/friendListReducer";
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
        dispatch(friendActions.removeFriendList(toId));
      }
    }
  }, [status]);

  return (
    <Button
      sx={{
        backgroundColor: "#FFC804",
        color: "black",
        border: "2px solid #111",
        width: "30%",
        height: "50px",
        borderRadius: "0",
        fontWeight: "bold",
        fontSize: "18px",
        fontFamily: "Noto Sans KR",
        "&:hover": {
          backgroundColor: "#FFD704",
        },
      }}
      onClick={() => deleteHandler(fromId, toId)}
    >
      친구끊기
    </Button>
  );
}

export default FriendBtnThree;
