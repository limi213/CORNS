import React, { useState, useEffect } from "react";
import { validatePwd, checkPwd } from "components/LoginSignin/SigninPassword";
import axios from "axios";

import { Box, Button, Input } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ChangePassword() {
  const [nowPassword, setNowPassword] = useState("");
  // const [stateNowPassword, setStateNowPassword] = useState(false);
  const [password1, setPassword1] = useState("");
  const [statePassword1, setStatePassword1] = useState(false);
  const [password2, setPassword2] = useState("");
  const [statePassword2, setStatePassword2] = useState(false);

  const onChangeNowPassword = (e) => {
    setNowPassword(e.target.value);
  };
  const onChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  useEffect(() => {
    setStatePassword1(Boolean(password1 && validatePwd(password1)));
    setStatePassword2(Boolean(password2 && checkPwd(password1, password2)));
  }, [password1, password2]);

  // 비밀번호 수정
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!nowPassword || !statePassword1 || !statePassword2) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/user`, {
        userId: sessionStorage.getItem("userId"),
        password: nowPassword,
        newPassword: password1,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h2>비밀번호 수정</h2>

      <Box sx={{ fontSize: "20px" }}>
        <Box>
          <h5>현재 비밀번호</h5>
          <Input
            type="password"
            autoComplete="off"
            placeholder="현재 비밀번호를 입력하세요."
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "50%",
              height: "45px",
            }}
            value={nowPassword}
            onChange={onChangeNowPassword}
          />
          {/* 
          <Button
            sx={{
              border: "3px solid #111",
              color: "#111111",
              backgroundColor: "#FFC804",
              width: "8%",
            }}
            // onClick={onSubmit}
          >
            확인
          </Button> */}
        </Box>

        <Box>
          <h5>새 비밀번호</h5>
          <Input
            type="password"
            autoComplete="off"
            placeholder="새 비밀번호를 입력하세요."
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "50%",
              height: "45px",
            }}
            value={password1}
            onChange={onChangePassword1}
          />

          <p
            css={css`
              font-size: 12px;
              color: ${!password1 || statePassword1 ? "#FFFFFF" : "#FF0000"};
            `}
          >
            비밀번호는 영문, 숫자, 특수문자를 포함한 8-20글자여야합니다.
          </p>
        </Box>

        <Box>
          <h5>비밀번호 재확인</h5>
          <Input
            type="password"
            autoComplete="off"
            placeholder="비밀번호를 재입력하세요."
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "50%",
              height: "45px",
            }}
            value={password2}
            onChange={onChangePassword2}
          />

          <p
            css={css`
              font-size: 12px;
              color: ${!password2 || statePassword2 ? "#FFFFFF" : "#FF0000"};
            `}
          >
            비밀번호가 일치하지 않습니다.
          </p>
        </Box>

        <Button
          sx={{
            border: "3px solid #111",
            color: "#111111",
            backgroundColor: "#FFC804",
            width: "10%",
            mt: "5%",
          }}
          onClick={onSubmit}
        >
          적용
        </Button>
      </Box>
    </>
  );
}

export default ChangePassword;
