import React from "react";
import ParticipantCard from "../GlobalComponents/ParticipantCard";
import Box from "@mui/material/Box";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function ParticipantList({ participants, myId }) {
  return (
    <ul
      css={css`
        list-style: none;
        display: flex;
        padding: 0;
        justify-content: center;
        margin-bottom: 64px;
      `}
    >
      {participants.map((item, index) => {
        return (
          <li key={index}>
            <Box sx={{ border: "3px solid #111", mr: "2rem" }}>
              <ParticipantCard participant={item} myId={myId} />
            </Box>
          </li>
        );
      })}
    </ul>
  );
}

export default ParticipantList;
