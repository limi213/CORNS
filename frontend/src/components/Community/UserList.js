import React from "react";
import UserItem from "./UserItem";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function UserList({ items }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {items.map((item, index) => {
            return <UserItem item={item} key={index} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
