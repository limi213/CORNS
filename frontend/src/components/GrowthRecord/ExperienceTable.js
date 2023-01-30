import { React, useEffect } from "react";

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

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("2023.01.18", "경험치 적립내용입니다.", "15exp"),
  createData("2023.01.18", "경험치 적립내용입니다.", "15exp"),
  createData("2023.01.18", "경험치 적립내용입니다.", "15exp"),
  createData("2023.01.18", "경험치 적립내용입니다.", "15exp"),
  createData("2023.01.18", "경험치 적립내용입니다.", "15exp"),
  createData("2023.01.18", "경험치 적립내용입니다.", "15exp"),
];

function ExperienceTable({}) {
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
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ExperienceTable;
