import React from "react";
import RankingTableItem from "./RankingTableItem";

import { TableContainer, Table, TableBody, Modal } from "@mui/material";

function RankingtTableList({ items }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {items.map((item, index) => {
            return <RankingTableItem item={item} ranking={index} key={index} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankingtTableList;
