import React from "react";

import { Carousel, CarouselItem } from "./Carousel";
import RequestCard from "./RequestCard";

function RequestList({ users }) {
  return (
      <Carousel>
        {users.map((item, index) => {
          return (
            <CarouselItem key={index}>
              <RequestCard user={item} />
            </CarouselItem>
          );
        })}
      </Carousel>
  );
}

export default RequestList;
