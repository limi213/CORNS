import React from "react";

import RoomCard from "./RoomCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function RoomList() {
  const datas = [
    { id: 1, subject: "일상" },
    { id: 2, subject: "비즈니스" },
    { id: 3, subject: "소개팅" },
    { id: 4, subject: "오픽" },
    { id: 5, subject: "토스" },
    { id: 6, subject: "자유" },
    { id: 7, subject: "일상" },
    { id: 8, subject: "비즈니스" },
    { id: 9, subject: "소개팅" },
    { id: 10, subject: "오픽" },
    { id: 11, subject: "토스" },
    { id: 12, subject: "자유" },
  ];

  const roomList = datas.map((item) => (
    <Grid item xs={6} sm={3} md={2} key={item.id}>
      <RoomCard title={item.subject} />
    </Grid>
  ));

  return (
    <>
      <h2>쫑알룸리스트</h2>
      <Box>
        <Grid container spacing={1}>
          {roomList}
        </Grid>
      </Box>
    </>
  );
}

export default RoomList;
