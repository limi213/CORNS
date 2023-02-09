import React, { useState, useEffect } from "react";
import { Box, Rating, Typography } from "@mui/material";

export default function StarRating({ registered, score, setScore }) {

  const changeHandler = (e) => {
    // 0점 등록되면 안됨
    console.log(e.target.value)
    if (e.target.value > 0) {
      setScore(parseInt(e.target.value));
    }
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >

      {registered ? (
        <Rating readOnly value={score} />
      ) : (
        <Rating value={score} onChange={changeHandler} />
      )}
    </Box>
  );
}
