import React from "react";

import { Button, Typography } from "@mui/material";

function FriendsBtn({ status }) {
  let btnContent = "";
  let btnColor = "";
  if (status === true) {
    btnContent = "친구끊기";
    btnColor = "#ddd";
  } else if (status === false) {
    btnContent = "친구신청";
    btnColor = "#FFC804";
  }
  return (
    <>
      <Button
        variant="contained"
        sx={{
          height: "4rem",
          px: "3rem",
          backgroundColor: btnColor,
          color: "#111",
          border: "3px solid #111",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5">{btnContent}</Typography>
        <input hidden type="submit"></input>
      </Button>
    </>
  );
}

export default FriendsBtn;
