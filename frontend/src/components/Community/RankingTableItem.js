import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function RankingTableItem({ item, ranking }) {
  const { img_url, nickname, user_id, level, value } = item;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{ranking + 1}등</TableCell>
      <TableCell>
        <img
          src={img_url}
          alt={nickname}
          css={css`
            border-radius: 200px;
            width: 40px;
            height: 40px;
          `}
        />
      </TableCell>
      <TableCell>
        {nickname}#{user_id}
      </TableCell>
      <TableCell>Lv.{level}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}

export default RankingTableItem;
