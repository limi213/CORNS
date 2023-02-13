import { React, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getExpLog } from "store/reducers/expLogReducer";
import useAxios from "auth/useAxios";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { toStringDate } from "store/reducers/roomFilterReducer";

function createData(date, contents, exp) {
  let transContents = "";
  if (contents === 3000) {
    transContents = "출석 경험치입니다.";
  } else if (contents === 3001) {
    transContents = "쫑알쫑알 경험치입니다.(시간에 따라 차등지급)";
  } else {
    transContents = "따봉 경험치입니다.";
  }
  return { date, transContents, exp };
}

function ExperienceTable({}) {
  // const dispatch = useDispatch();
  // const { data, loading } = useSelector((state) => state.expLogReducer);
  const { data, status, isLoading, sendRequest } = useAxios();
  const userId = sessionStorage.getItem("userId");

  const now = new Date();
  const pp = {
    page: 0,
    size: 1000,
    userId,
    baseTime: toStringDate(now),
  };
  console.log(data);

  useEffect(() => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/growth/exp/list/${userId}`,
      params: pp,
    });
  }, []);

  if (!isLoading && status === 200) {
    const expList = data.list;

    const rows = expList.map((exp) => {
      return createData(exp.regTm, exp.expCd, exp.gainExp);
    });

    return (
      <>
        <TableContainer component={Paper} sx={{ mt: "4rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>날짜</TableCell>
                <TableCell align="right">적립내용</TableCell>
                <TableCell align="right">경험치</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.transContents}</TableCell>
                  <TableCell align="right">{row.exp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default ExperienceTable;
