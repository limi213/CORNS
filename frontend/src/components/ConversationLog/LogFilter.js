import React from "react";
import SubjectBtn from "../Conversation/SubjectBtn";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

function LogFilter() {
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
    <Box sx={{ border: "3px solid #111", background: "#FFC804" }}>
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

      <Box component="form">
        <h4>날짜</h4>
        <input type="date" /> ~ <input type="date" />
      </Box>

      <Box sx={{ flexDirection: "row" }}>
        <h4>자기평가</h4>
        <FormControlLabel control={<Checkbox />} label="1" />
        <FormControlLabel control={<Checkbox />} label="2" />
        <FormControlLabel control={<Checkbox />} label="3" />
        <FormControlLabel control={<Checkbox />} label="4" />
        <FormControlLabel control={<Checkbox />} label="5" />
      </Box>

      <Box>
        <h4>따봉뱃지</h4>
        <FormControlLabel control={<Checkbox />} label="있음" />
        <FormControlLabel control={<Checkbox />} label="없음" />
      </Box>

      <Button variant="contained">전체해제</Button>
    </Box>
  );
}

export default LogFilter;
