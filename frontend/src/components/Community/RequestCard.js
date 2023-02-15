import React from "react";
import UserNameTag from "components/GlobalComponents/UserNameTag";
import FriendBtnTwo from "components/GlobalComponents/FriendBtnTwo";

import { Box, Card } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Envelope } from "react-bootstrap-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileImg from "components/GlobalComponents/ProfileImg";


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    fontFamily: 'Noto Sans KR',

  },
}));



function RequestCard({ user }) {
  const { userId, nickname, imgUrl, message } = user;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "240px",
          width: "240px",
          height: "260px",
          padding: "16px",
          boxSizing: "border-box",
          border: "3px solid #111111",
          mr: "1.5rem",
        }}
      >
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <LightTooltip title={message} placement="top-end">
            <Envelope
              css={css`
                font-size: 20px;
                cursor: ${message && "pointer"};
                color: ${message? "black": "white"}
              `}
            />
          </LightTooltip>
        </Box>

        <ProfileImg imgSrc={imgUrl} nickname={nickname} width={"100px"}/>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <p css={css`font-size: ${nickname.length < 14 ? "18px" : "15px"}`}>
            <UserNameTag nickname={nickname} userId={userId} />
          </p>
        </Box>

        <FriendBtnTwo fromId={sessionStorage.getItem("userId")} toId={userId} height={"40px"} fontSize={"16px"}/>
      </Card>
    </>
  );
}

export default RequestCard;
