import React from "react";
import LogFilter from "../../components/ConversationLog/LogFilter";
import LogHeader from "../../components/ConversationLog/LogHeader";
import LogList from "../../components/ConversationLog/LogList";

function Log() {
  // fetch
  // dummy data
  const logs = [
    {
      room_no: 1000,
      bookmark: true,
      subject: 1,
      title: "제목1",
      start_date: "2023-01-18",
      time: 5,
      max_member: 4,
      self_score: 5,
      ddabong: 3,
    },
    {
      room_no: 1001,
      bookmark: false,
      subject: 2,
      title: "제목2",
      start_date: "2023-01-18",
      time: 5,
      max_member: 2,
      self_score: 5,
      ddabong: 3,
    },
  ];

  return (
    <>
      <h5>쫑알로그</h5>
      <LogFilter />
      <hr />
      <LogHeader />
      <LogList logs={logs} />
    </>
  );
}

export default Log;
