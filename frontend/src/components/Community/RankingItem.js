import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function RankingItem({item, ranking}) {
  const {
    img_url,
    nickname,
    user_id,
    level,
    value
  } = item;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{ranking<3 ? '★' : null }{ranking+1}등</TableCell>
      <TableCell><img src={img_url} alt={nickname}/></TableCell>
      <TableCell>{nickname}#{user_id}</TableCell>
      <TableCell>Lv.{level}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  )
}

export default RankingItem;