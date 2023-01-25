import React from "react";

import Box from "@mui/material/Box";
import SubjectBtn from "./SubjectBtn";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

function ConversationRoomFilter() {
  const datas = [
    { id: 1, subject: "일상" },
    { id: 2, subject: "비즈니스" },
    { id: 3, subject: "소개팅" },
    { id: 4, subject: "오픽" },
    { id: 5, subject: "토스" },
    { id: 6, subject: "자유" },
  ];

  const subjectBtn = datas.map((item) => (
    <SubjectBtn active={false} subject={item.subject} key={item.id} />
  ));

  return (
    <>
      <Box sx={{ border: "3px solid #111" }}>
        <Box>
          주제
          {subjectBtn}
        </Box>

        <Box component="form">
          시간
          <TextField
            id="outlined-basic"
            label="최소시간(분)"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="최대시간(분)"
            variant="outlined"
          />
        </Box>
        <Box>
          입장가능여부
          <Checkbox />
        </Box>
        <Button variant="contained">전체해제</Button>
      </Box>
    </>
  );
}

export default ConversationRoomFilter;
