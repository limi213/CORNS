import React from "react";

import RoomCard from "./RoomCard";

import { Box, Grid } from "@mui/material";

function RoomList({ roomLists, maxRoomList }) {
  let roomList = "";

  if (maxRoomList) {
    const limitRoomList = roomLists.slice(0, 6);

    roomList = limitRoomList.map((item) => (
      <Grid item xs={6} sm={3} md={2} key={item.room.roomNo}>
        <RoomCard room={item.room} subject={item.subject} />
      </Grid>
    ));
  } else {
    roomList = roomLists.map((item) => (
      <Grid item xs={6} sm={3} md={2} key={item.room.roomNo}>
        <RoomCard room={item.room} subject={item.subject} />
      </Grid>
    ));
  }

  // console.log(roomLists);
  return (
    <>
      <Box sx={{ mt: "64px" }}>
        <Grid container spacing={1}>
          {roomLists && roomList}
        </Grid>
      </Box>
    </>
  );
}

export default RoomList;
