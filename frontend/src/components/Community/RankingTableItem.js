import React, { useEffect } from "react";

import ProfileImg from "components/GlobalComponents/ProfileImg";
import UserNameTag from "components/GlobalComponents/UserNameTag";
import { TableRow, TableCell } from "@mui/material";

function RankingTableItem({ item, unit }) {
  const { ranking, userId, nickname, imgUrl, levelNo, value } = item;

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell sx={{fontSize: "16px", fontFamily: "Noto Sans KR"}}>{ranking}등</TableCell>
        <TableCell>
          <ProfileImg imgSrc={imgUrl} alt={nickname} width={"40px"} />
        </TableCell>

        <TableCell sx={{fontSize: "16px", fontFamily: "Noto Sans KR"}}>
          <UserNameTag nickname={nickname} userId={userId} />
        </TableCell>

        <TableCell sx={{fontSize: "16px", fontFamily: "Noto Sans KR"}}>Lv.{levelNo}</TableCell>
        <TableCell sx={{fontSize: "16px", fontFamily: "Noto Sans KR"}}>{(unit === "분") ? Math.round(value/60) : value } {unit}</TableCell>
      </TableRow>
    </>
  );
}

export default RankingTableItem;
