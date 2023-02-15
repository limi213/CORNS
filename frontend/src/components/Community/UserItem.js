import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ProfileImg from "components/GlobalComponents/ProfileImg";
import UserNameTag from "components/GlobalComponents/UserNameTag";

function UserItem({ item }) {
  const { userId, imgUrl, nickname, levelNo } = item;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <ProfileImg imgSrc={imgUrl} nickname={nickname} width={"40px"} />
      </TableCell>
      <TableCell sx={{ fontSize: "16px", fontFamily: "Noto Sans KR" }}>
        <UserNameTag nickname={nickname} userId={userId} />
      </TableCell>
      <TableCell sx={{ fontSize: "16px", fontFamily: "Noto Sans KR" }}>
        Lv.{levelNo}
      </TableCell>
    </TableRow>
  );
}

export default UserItem;
