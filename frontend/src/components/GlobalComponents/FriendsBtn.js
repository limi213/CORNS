import React from "react";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

function FriendsBtn({ status }) {
  let btnContent = "";
  let btnColor = "";
  if (status === "5000") {
    btnContent = "친구신청중";
    btnColor = "#67C73A";
  } else if (status === "5001") {
    btnContent = "친구수락";
    btnColor = "#3C90F2";
  } else if (status === "5002") {
    btnContent = "친구끊기";
    btnColor = "#DDDDDD";
  } else {
    btnContent = "친구신청";
    btnColor = "#FFC804";
  }
  return (
    <>
      <Button variant="contained" sx={{ backgroundColor: btnColor }}>
        {btnContent}
      </Button>
    </>
  );
}

export default FriendsBtn;
