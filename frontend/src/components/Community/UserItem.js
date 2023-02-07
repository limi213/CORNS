import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ProfileImg from "components/GlobalComponents/ProfileImg";
import UserNameTag from "components/GlobalComponents/UserNameTag";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function UserItem({ item }) {
  const { userId, imgUrl, nickname, levelNo } = item;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <ProfileImg imgSrc={imgUrl} nickname={nickname} width={"40px"}/>
      </TableCell>
      <TableCell>
        <UserNameTag nickname={nickname} userId={userId} />
      </TableCell>
      <TableCell>Lv.{levelNo}</TableCell>
    </TableRow>
  );
}

export default UserItem;
