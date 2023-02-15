import React from "react";
import ProfileImg from "components/GlobalComponents/ProfileImg";
import UserNameTag from "components/GlobalComponents/UserNameTag";
import { openScript, downloadScript } from "routes/ConversationLog/LogDetail";

import { Box, Card, Button } from "@mui/material";
import { HandThumbsUp } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ParticipantScriptCard({ roomNo, participant }) {
  const { userId, nickname, imgUrl, thumbCnt, speaking, scriptUrl } =
    participant;

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          pt: "24px",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          gap: "18px",
        }}
      >
        <ProfileImg imgSrc={imgUrl} nickname={nickname} width={"197px"} />

        <span css={css`font-size: 20px; margin: 10px;`}>
          <UserNameTag nickname={nickname} userId={userId} />
        </span>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "2px solid #111",
              p: "5px 11px",
              margin: "0 20px 0 0",
            }}
          >
            <HandThumbsUp
              css={css`
                font-size: 24px;
                margin-right: 8px;
              `}
            />
            <span>{thumbCnt}</span>
          </Box>
          <span>발화량: {speaking}</span>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: "8px",
            margin: "15px 0 20px 0",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#FFC804",
              color: "#111111",
              border: "2px solid #111",
              width: "100%",
              height: "50px",
              borderRadius: "0",
              fontWeight: "bold",
              fontSize: "16px",
              fontFamily: "Noto Sans KR",
              "&:hover": {
                backgroundColor: "#FFD704",
              },
            }}
            onClick={() => openScript(scriptUrl)}
          >
            스크립트 보기
          </Button>

          <Button
            sx={{
              backgroundColor: "#024A9E",
              color: "white",
              border: "2px solid #111",
              width: "100%",
              height: "50px",
              borderRadius: "0",
              fontWeight: "bold",
              fontSize: "16px",
              fontFamily: "Noto Sans KR",
              "&:hover": {
                backgroundColor: "#1766C3",
              },
            }}
            onClick={() => downloadScript(scriptUrl, roomNo, userId)}
          >
            스크립트 다운
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default ParticipantScriptCard;
