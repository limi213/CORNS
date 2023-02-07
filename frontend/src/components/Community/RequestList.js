import React from "react";

import { Carousel, CarouselItem } from "./Carousel";
import RequestCard from "./RequestCard";
import { Box } from "@mui/material";

function RequestList({ users }) {
  return (
    <Box
      sx={{
        backgroundColor: "#DDDDDD",
        border: "3px solid #111111",
        position: "relative",
        p: "1.5rem",
      }}
    >
      <Carousel>
        {users.map((item, index) => {
          return (
            <CarouselItem key={index}>
              <RequestCard user={item} />
            </CarouselItem>
          );
        })}
      </Carousel>
    </Box>
  );
}

export default RequestList;
