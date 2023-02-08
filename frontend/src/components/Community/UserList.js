import React from "react";
import UserItem from "./UserItem";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function UserList({ userList }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {userList.map((item) => {
            return <UserItem item={item} key={item.userId} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
