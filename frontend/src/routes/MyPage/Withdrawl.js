import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button'

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Withdrawl() {
  const [option, setOption] = useState("");

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <>
      <h2>회원 탈퇴</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h5>탈퇴사유</h5>

        <FormControl sx={{ width: "50%" }}>
          <Select value={option} onChange={handleChange} min-width="100px">
            <MenuItem value={"option1"}>이메일 변경 및 재가입</MenuItem>
            <MenuItem value={"option2"}>컨텐츠 부족</MenuItem>
            <MenuItem value={"option3"}>이용 불편</MenuItem>
            <MenuItem value={"option4"}>회원간의 불화</MenuItem>
            <MenuItem value={"option5"}>사이트 관리부족</MenuItem>
            <MenuItem value={"option6"}>지구온난화</MenuItem>
            <MenuItem value={"self"}>직접입력</MenuItem>
          </Select>
        </FormControl>

        {option === "self" ? (
          <TextField
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: "50%", backgroundColor: "white" }}
            value={text}
            onChange={onChange}
          />
        ) : null}

        {option ? (
          <>
            <Box
              sx={{
                border: "3px solid #111",
                backgroundColor: "#FFE767",
                margin: "16px 0"
              }}
            >
              <p>정말로 탈퇴하시겠습니까?ㅜㅜ</p>
              <p>어쩌구저쩌구....................</p>
            </Box>
            <Button
              sx={{
                backgroundColor: "#F6F6F6",
                color: "#111111",
                width: "139px"
              }}
            >
              동의 후 탈퇴
            </Button>
          </>
        ) : null}
      </Box>
    </>
  );
}

export default Withdrawl;
