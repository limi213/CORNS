import React from "react";
import LogItem from "../../components/ConversationLog/LogItem";
import ParticipantScriptList from "../../components/GlobalComponents/ParticipantScriptList";
import SelfEvaluation from "../../components/GlobalComponents/SelfEvaluation";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";

import backgroundImage from '../../assets/backgroundImage.png'

function LogDetail({ match }) {
  const { room_no } = match.params;

  // fetch 방 상세 정보 불러오기
  // dummy data
  const log = {
    room_no: 1000,
    bookmark: true,
    subject: 1,
    title: "제목1",
    start_date: "2023-01-18",
    time: 5,
    max_member: 4,
    self_score: 5,
    ddabong: 3,
  };

  const participants = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 100000,
      thumbs: 2,
      ignition: "3분 20초",
      script: "",
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "haun",
      user_id: 100001,
      thumbs: 1,
      ignition: "4분",
      script: "",
    },
  ];

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <LogItem log={log} />
        </TableBody>
      </Table>
      <hr />

      <ParticipantScriptList participants={participants} />

      <Box sx={{margin: '64px 0 0 0', backgroundImage: `url(${backgroundImage})`}}>
        <SelfEvaluation/>
      </Box>
    </>
  );
}

export default LogDetail;
