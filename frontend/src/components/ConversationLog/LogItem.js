import React from "react";
import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function LogItem({ log }) {
  // dummy data
  const {
    room_no,
    bookmark,
    subject,
    title,
    start_date,
    time,
    max_member,
    self_score,
    ddabong,
  } = log;
  const logUrl = `/conversationLog/logdetail/${room_no}`;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <button>bookmark</button>
      </TableCell>
      <TableCell>{subject}</TableCell>
      <TableCell>
        <Link to={logUrl}>{title}</Link>
      </TableCell>
      <TableCell>{start_date}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell>{max_member}</TableCell>
      <TableCell>{self_score}</TableCell>
      <TableCell>{ddabong}</TableCell>
    </TableRow>
  );
}

export default LogItem;
