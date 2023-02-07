import React from 'react';
import { Button } from "@mui/material";

// 내가 친구신청 건 상태
// click disabled
function FriendBtnOne () {
  return (
    <Button
      sx={{
        border: "3px solid #111",
        backgroundColor: "#3C90F2",
      }}
      disabled
    >
      친구신청중
    </Button>
  );
};

export default FriendBtnOne;;