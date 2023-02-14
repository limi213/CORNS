import React from "react";
import ProfileImg from "components/GlobalComponents/ProfileImg";
import UserNameTag from "components/GlobalComponents/UserNameTag";
import { openScript } from "routes/ConversationLog/LogDetail";

import { Box, Card, Button } from "@mui/material";
import { HandThumbsUp } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


// 수정 예정
const downloadScript = (scriptUrl) => {
  if (!scriptUrl) {
    return;
  }
  let fileName = '파일이름.txt';
  let output = "string 타입의 데이터";
  const element = document.createElement('a');
  const file = new Blob([output], {
    type: 'text/plain',
  });
  element.href = scriptUrl;
  element.download = fileName;
  document.body.appendChild(element);
  element.click();

}


function ParticipantScriptCard({ participant }) {
  const { userId, nickname, imgUrl, thumbCnt, speaking, scriptUrl } = participant;

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

        <UserNameTag nickname={nickname} userId={userId} />

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

        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "8px",
            margin: "0 0 30px 0",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#FFC804",
              color: "#111111",
              border: "2px solid #111",
            }}
            onClick={() => openScript(scriptUrl)}
          >
            스크립트 보기
          </Button>
          <a
            href={scriptUrl}
            download
            type="text/html"
            target="_self"
            css={css`
              text-decoration: none;
              color: black;
            `}
          >
            <Button
              sx={{
                backgroundColor: "#024A9E",
                color: "#111111",
                border: "2px solid #111",
                width: "100%",
              }}
            >
              스크립트 다운
            </Button>
          </a>
        </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "8px",
            margin: "0 0 30px 0",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#FFC804",
              color: "#111111",
              border: "2px solid #111",
            }}
            onClick={() => openScript(scriptUrl)}
          >
            스크립트 보기
          </Button>

          <Button
            sx={{
              backgroundColor: "#024A9E",
              color: "#111111",
              border: "2px solid #111",
              width: "100%",
            }}
            onClick={() => downloadScript(scriptUrl)}
          >
            스크립트 다운
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default ParticipantScriptCard;
