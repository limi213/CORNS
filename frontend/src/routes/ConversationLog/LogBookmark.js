import React from "react";
import LogHeader from "../../components/ConversationLog/LogHeader";
import LogList from "../../components/ConversationLog/LogList";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

function LogBookmark() {
  // fetch
  // dummy data
  const logs = [
    {
      room_no: 1000,
      bookmark: true,
      subject: "일상",
      title: "제목1입니다. 어쩌구",
      start_date: "2023-01-18",
      time: 5,
      max_member: 4,
      self_score: 5,
      ddabong: 3,
    },
    {
      room_no: 1001,
      bookmark: false,
      subject: "오픽",
      title: "제목2입니다. 저쩌구",
      start_date: "2023-01-18",
      time: 5,
      max_member: 2,
      self_score: 5,
      ddabong: 3,
    },
  ];

  return (
    <>
      <h2>즐겨찾기</h2>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <LogHeader />
          </TableHead>
          <TableBody>
            <LogList logs={logs} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LogBookmark;
