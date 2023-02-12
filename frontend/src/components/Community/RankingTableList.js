import React, { useState, useEffect } from "react";
import RankingTableItem from "./RankingTableItem";

import { TableContainer, Table, TableBody } from "@mui/material";
import useAxios from "auth/useAxios";

function RankingtTableList({ type, unit }) {
  // useAxios hook
  const { data, status, isLoading, sendRequest } = useAxios();


  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/rank/${type}`,
    });
  }, [type]);

  return (
    <>
      {isLoading && <p>loading중...</p>}
      {!isLoading && status === 200 && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {data.rankList.map((item) => {
                return (
                  <RankingTableItem item={item} key={item.userId} unit={unit} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!isLoading && status === 204 && <p>조회된 데이터가 없습니다.</p>}
    </>
  );
}

export default RankingtTableList;
