import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { Box, Button } from "@mui/material";
import yellow_logo from "assets/corns_logo_yellow.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

async function checkEmail({ email }) {
  const response = await axios.get(
    `http://i8a506.p.ssafy.io:8645/user/email-check/${email}`
  );
  return response.data;
}

function SigninCard() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };
  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  // 이메일 중복 확인 axios
  const onCheckEmail = async (e) => {
    e.preventDefault();
    if (!email) return alert('이메일을 입력해주세요.')
    if (!validateEmail(email)) return alert('유효하지 않은 이메일입니다.');
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}${email}`)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }


  // 비밀번호 유효성 검사 -> 추후 수정
  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };

  // 비밀번호1, 비밀번호2 확인
  const checkPwd = (password1, password2) => {
    return password1 === password2;
  };

  // 닉네임 유효성 검사 -> 추후 수정
  const validateNickname = (nickname) => {
    return nickname.toLowerCase().match(/^[a-z|A-Z|].{1,8}$/);
  };

  // 회원가입 -> fetch
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password1);

      // POST 요청
      const res = await fetch("/user/join", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password1,
          nickname,
        }),
      });
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        padding: "32px 48px",
        border: "3px solid #111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        height: "800px",
      }}
    >
      <NavLink to="/">
        <img
          src={yellow_logo}
          alt="corns-logo"
          css={css`
            height: 2rem;
          `}
        />
      </NavLink>

      <Box sx={{ width: "80%" }}>
        <h5
          css={css`
            font-size: 20px;
          `}
        >
          이메일
        </h5>
        <Box sx={{ display: "flex", flexDirectionn: "row", gap: "10px" }}>
          <input
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={onChangeEmail}
            css={css`
              width: 80%;
              height: 45px;
            `}
          />
          <Button
            sx={{
              backgroundColor: "#FFB800",
              color: "#111111",
            }}
            onClick={onCheckEmail}
          >
            중복확인
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: "80%" }}>
        <h5
          css={css`
            font-size: 20px;
          `}
        >
          비밀번호
        </h5>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password1}
          onChange={onChangePassword1}
          css={css`
            width: 95%;
            height: 45px;
          `}
        />
        <div
          css={css`
            font-size: 12px;
          `}
        >
          비밀번호는 영문, 숫자, 특수문자를 포함한 8-20글자여야합니다.
        </div>
        <input
          type="password"
          placeholder="비밀번호를 재입력하세요."
          value={password2}
          onChange={onChangePassword2}
          css={css`
            width: 95%;
            height: 45px;
          `}
        />
        {password2 && !checkPwd(password1, password2) && (
          <div
            css={css`
              font-size: 12px;
              color: #ff0000;
            `}
          >
            비밀번호가 일치하지 않습니다.
          </div>
        )}
      </Box>

      <Box sx={{ width: "80%" }}>
        <h5
          css={css`
            font-size: 20px;
          `}
        >
          닉네임
        </h5>
        <input
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={onChangeNickname}
          css={css`
            width: 95%;
            height: 45px;
          `}
        />
        <div
          css={css`
            font-size: 12px;
          `}
        >
          닉네임은 실제로 불릴 이름이며, 영문으로 표기해야합니다.
        </div>
      </Box>

      <Button
        sx={{
          backgroundColor: "#FFC804",
          color: "#111111",
          margin: "64px 0",
          width: "240px",
          height: "60px",
        }}
        onClick={onSubmit}
      >
        회원가입
      </Button>
    </Box>
  );
}

export default SigninCard;
