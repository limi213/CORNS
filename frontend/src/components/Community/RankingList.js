import React from "react";
import RankingItem from "./RankingItem";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function RankingList({ items }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {items.map((item, index) => {
            return <RankingItem item={item} ranking={index} key={index} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankingList;
