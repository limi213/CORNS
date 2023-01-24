import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function UserCard({ nickname, level, id }) {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffa903",
          height: "436px",
          border: "3px solid #111",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "250px",
            width: "250px",
            borderRadius: "200px",
            border: "15px solid white",
          }}
          image="https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" sx={{ fontSize: 42 }}>
              Hello!
              <br />
              {nickname}!
            </Typography>
            <Typography sx={{ fontSize: 42 }} component="div">
              Lv.{level}
            </Typography>
            <Typography sx={{ fontSize: 16 }} component="div">
              #{id}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </>
  );
}

export default UserCard;
