import React from "react";

import { Box, Card, CardContent, CardMedia } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function UserCard({ nickname, level, id, imgUrl }) {
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
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        
        <CardMedia
          component="img"
          sx={{
            height: "12vw",
            width: "12vw",
            borderRadius: "200px",
            border: "15px solid white",
            backgroundColor: "white",
          }}
          image={imgUrl}
          alt={nickname}
        />

        
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", ml: "32px" }}>
            <p
              component="div"
              css={css`
                font-size: 42px;
                font-weight: 800;
                margin: 0;
                margin-bottom: 16px;
              `}
            >
              Hi, Welcome!
            </p>
            <p
              component="div"
              css={css`
                font-size: 42px;
                font-weight: 800;
                margin: 0;
                margin-bottom: 16px;
                word-break: break-all;
                text-shadow: 2px 2px 0 #fff;
              `}
            >
              {nickname}!
            </p>
            <p
              component="div"
              css={css`
                font-size: 36px;
                font-weight: bold;
                margin: 0;
                margin-bottom: 16px;
              `}
            >
              Lv.{level}
            </p>
            <p
              component="div"
              css={css`
                font-size: 32px;
                font-weight: bold;
                margin: 0;
                margin-bottom: 16px;
              `}
            >
              #{id}
            </p>
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
