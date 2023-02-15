import React, { useEffect } from "react";
import useAxios from "auth/useAxios";
import { useDispatch } from "react-redux";
import { getFriendListAxios } from "store/reducers/friendListReducer";
import { friendActions } from "store/reducers/friendListReducer";

import { Box, Button } from "@mui/material";

// 친구신청 받은 상태
function FriendBtnTwo({ fromId, toId, setRelation, height="50px", fontSize="18px" }) {
  const dispatch = useDispatch();

  const { status: acceptStatus, sendRequest: acceptRequest } = useAxios();
  const { status: rejectStatus, sendRequest: rejectRequest } = useAxios();

  // 수락
  const acceptHandler = (fromId, toId) => {
    acceptRequest({
      url: `${process.env.REACT_APP_HOST}/friend/accept`,
      method: "POST",
      data: {
        fromId: fromId,
        toId: toId,
      },
    });
  };

  useEffect(() => {
    if (acceptStatus === 200) {
      if (setRelation) {
        setRelation(3);
      }
      if (window.location.pathname.includes("friends")) {
        // dispatch(friendActions.removeFriendRequestList(toId));
        // dispatch(getFriendListAxios());

        // 임시 reload
        window.location.reload();
      }
    }
  }, [acceptStatus, dispatch]);

  // 거절
  const rejectHandler = (fromId, toId) => {
    rejectRequest({
      url: `${process.env.REACT_APP_HOST}/friend/reject`,
      method: "POST",
      data: {
        fromId: fromId,
        toId: toId,
      },
    });
  };

  useEffect(() => {
    if (rejectStatus === 200) {
      if (setRelation) {
        setRelation(0);
      }
      if (window.location.pathname.includes("friends")) {
        // dispatch(friendActions.removeFriendRequestList(toId));
       
        // 임시 reload
        window.location.reload();
      }
    }
  }, [rejectStatus, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5%",
        width: "100%"
      }}
    >
      <Button
        sx={{
          backgroundColor: "#FFC804",
          color: "black",
          border: "2px solid #111",
          width: "20%",
          height: height,
          borderRadius: "0",
          fontWeight: "bold",
          fontSize: fontSize,
          fontFamily: "Noto Sans KR",
          "&:hover": {
            backgroundColor: "#FFD704",
          },
        }}
        onClick={() => acceptHandler(fromId, toId)}
      >
        수락
      </Button>

      <Button
        sx={{
          backgroundColor: "#024A9E",
          color: "white",
          border: "2px solid #111",
          width: "20%",
          height: height,
          borderRadius: "0",
          fontWeight: "bold",
          fontSize: fontSize,
          fontFamily: "Noto Sans KR",
          "&:hover": {
            backgroundColor: "#1766C3",
          },
        }}
        onClick={() => rejectHandler(fromId, toId)}
      >
        거절
      </Button>
    </Box>
  );
}

export default FriendBtnTwo;
