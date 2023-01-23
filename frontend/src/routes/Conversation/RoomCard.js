import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Stopwatch, People } from "react-bootstrap-icons";

function RoomCard({ title }) {
  return (
    <Card sx={{ maxWidth: 265, maxHeight: 320 }} variant="outlined">
      <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        image="https://www.ikea.com/images/jaettebo-3-5-eket-6a470b2ae178df6a009a9f98b087b2c1.jpg?f=s"
      />
      <CardContent sx={{ height: 110 - 32 }}>
        <Typography gutterBottom variant="p" component="div">
          {title}을/를 대화해 봅시다!
        </Typography>
        <Typography variant="body2">
          <span>
            <Stopwatch /> 10분
          </span>
          <span>
            <People /> 2 / 4명
          </span>
        </Typography>
      </CardContent>

      <Button variant="contained" sx={{ width: "100%", height: 50 }}>
        쫑알룸 입장하기
      </Button>
    </Card>
  );
}

export default RoomCard;
