import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Box, Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


// 비밀번호 유효성 검사
const validatePwd = (password) => {
  return password
  .toLowerCase()
  .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/);
}

// 비밀번호1, 비밀번호2 확인
const checkPwd = (password1, password2) => {
  return password1 === password2;
};


function SigninPassword({
  password1,
  setPassword1,
  password2,
  setPassword2,
  statePassword1,
  setStatePassword1,
  statePassword2,
  setStatePassword2
}) {

  const onChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };


  useEffect(() => {
    setStatePassword1(Boolean(password1 && validatePwd(password1)))
    setStatePassword2(Boolean(password2 && checkPwd(password1, password2)))
  }, [password1, password2]);


  return (
    <Box sx={{ width: "90%" }}>
      <h5
        css={css`
          font-size: 20px;
        `}
      >
        비밀번호
      </h5>
      <form>
        <input
          type="password"
          autoComplete="off"
          placeholder="비밀번호를 입력하세요."
          value={password1}
          onChange={onChangePassword1}
          css={css`
            width: 95%;
            height: 45px;
          `}
        />
      </form>

      <p
        css={css`
          font-size: 12px;
          color: ${!password1 || statePassword1
            ? "#FFFFFF" 
            : "#FF0000"};
        `}
      >
        비밀번호는 영문, 숫자, 특수문자를 포함한 8-20글자여야합니다.
      </p>

      <form>
        <input
          type="password"
          autoComplete="off"
          placeholder="비밀번호를 재입력하세요."
          value={password2}
          onChange={onChangePassword2}
          css={css`
            width: 95%;
            height: 45px;
          `}
        />
      </form>

      <p
        css={css`
          font-size: 12px;
          color: ${!password2 || statePassword2
            ? "#FFFFFF" 
            : "#FF0000"};
        `}
      >
        비밀번호가 일치하지 않습니다.
      </p>
    </Box>
  );
}

export default SigninPassword;
export {validatePwd, checkPwd};
