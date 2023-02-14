import React from 'react';
import { Button } from "@mui/material";

// 내가 친구신청 건 상태
// click disabled
function FriendBtnOne () {
  return (
    <Button
      sx={{
        backgroundColor: "#3C90F2",
        color: "white",
        border: "2px solid #111",
        width: "30%",
        height: "50px",
        borderRadius: "0",
        fontWeight: "bold",
        fontSize: "18px",
        fontFamily: "Noto Sans KR",
      }}
      disabled
    >
      친구신청중
    </Button>
  );
};

export default FriendBtnOne;;