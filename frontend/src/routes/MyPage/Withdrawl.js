import React, { useState } from "react";
import useAxios from "auth/useAxios";

import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
} from "@mui/material";
import Logout from "auth/Logout";



function Withdrawl() {
  const [option, setOption] = useState("");
  const [text, setText] = useState("");

  // 탈퇴 useAxios 활용
  const {status, sendRequest} = useAxios();

  const handleChange = (e) => {
    setOption(e.target.value);
    setText("");
  };
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    if (!option) {
      return;
    }
    await sendRequest({
      url: `${process.env.REACT_APP_HOST}/user`,
      method: 'POST',
      body: {
        userId: sessionStorage.getItem("userId"),
        withdrawNo : option, 
        description : text,
      }
    })
    if (status && status === 200) {
      alert('탈퇴 신청이 완료되었습니다.')
      Logout();
    }
  }


  return (
    <>
      <h2>회원 탈퇴</h2>
      <Box
        sx={{
          fontSize: "20px",
        }}
      >
        <h5>탈퇴사유</h5>

        <FormControl
          variant="standard"
          sx={{
            backgroundColor: "#fff",
            border: "3px solid #111",
            width: "50%",
            pl: "1%",
          }}
        >
          <Select
            value={option}
            onChange={handleChange}
            min-width="100px"
            sx={{ fontSize: "18px", fontFamily: "Noto Sans KR" }}
          >
            <MenuItem value={1}>이메일 변경 및 재가입</MenuItem>
            <MenuItem value={2}>컨텐츠 부족</MenuItem>
            <MenuItem value={3}>이용 불편</MenuItem>
            <MenuItem value={4}>회원간의 불화</MenuItem>
            <MenuItem value={5}>사이트 관리부족</MenuItem>
            <MenuItem value={6}>지구온난화</MenuItem>
            <MenuItem value={7}>직접입력</MenuItem>
          </Select>
        </FormControl>

        {option === 7 ? (
          <TextField
            multiline
            rows={4}
            sx={{
              width: "51%",
              backgroundColor: "white",
              border: "3px solid #111",
              mt: "20px",
            }}
            value={text}
            onChange={onChange}
            inputProps={{ maxLength: 100 }}
          />
        ) : null}

        {option ? (
          <>
            <Box
              sx={{
                border: "3px solid #111",
                backgroundColor: "#FFE767",
                margin: "4% 0",
                padding: "0 3%",
                fontSize: "16px",
              }}
            >
              <p>
                회원님의 데이터는 탈퇴 이후에도 6개월간 보관될 예정이며, 2주안에
                재로그인시 데이터 삭제를 진행하지 않습니다.
              </p>
              <p>
                후에 영구적으로 계정이 삭제되면 모든 데이터는 복구가
                불가능합니다.
              </p>
              <p>정말로 탈퇴하시겠습니까? ㅠ</p>
            </Box>
            <Button
              sx={{
                backgroundColor: "#F6F6F6",
                color: "#111111",
                width: "139px",
                border: "3px solid #111", 
              }}
              onClick={onSubmit}
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
