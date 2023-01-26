import React from "react";
import ParticipantCard from "../GlobalComponents/ParticipantCard";
import Box from "@mui/material/Box";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function ParticipantList({ participants }) {
  return (
    <ul
      css={css`
        list-style: none;
        display: flex;
        padding: 0;
      `}
    >
      {participants.map((item, index) => {
        return (
          <li>
            <Box sx={{ border: "3px solid #111" }}>
              <ParticipantCard participant={item} key={index} />
            </Box>
          </li>
        );
      })}
    </ul>
  );
}

export default ParticipantList;
