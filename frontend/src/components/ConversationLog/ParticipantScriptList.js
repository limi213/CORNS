import React from "react";
import ParticipantScriptCard from "./ParticipantScriptCard";
import Box from "@mui/material/Box";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ParticipantScriptList({ roomNo, participants }) {
  return (
    <ul
      css={css`
        list-style: none;
        display: flex;
        padding: 0;
        width: 100%;
        margin: 50px 0;
        gap: 10px;
      `}
    >
      {participants.map((item) => {
        return (
          <li
            key={item.userId}
            css={css`
              width: 25%;
            `}
          >
            <Box sx={{ border: "3px solid #111" }}>
              <ParticipantScriptCard roomNo={roomNo} participant={item} />
            </Box>
          </li>
        );
      })}
    </ul>
  );
}

export default ParticipantScriptList;
