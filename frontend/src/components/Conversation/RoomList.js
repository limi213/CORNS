import React from "react";

import RoomCard from "./RoomCard";

import { Box, Grid } from "@mui/material";

function RoomList({ roomLists }) {
  const roomList = roomLists.map((item) => (
    <Grid item xs={6} sm={3} md={2} key={item.room.roomNo}>
      <RoomCard room={item.room} subject={item.subject} />
    </Grid>
  ));

  console.log(roomLists);
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          {roomLists && roomList}
        </Grid>
      </Box>
    </>
  );
}

export default RoomList;
