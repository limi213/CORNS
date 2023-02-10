import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import Login from "auth/Login";

import { Box, Button } from "@mui/material";
import yellow_logo from "assets/corns_logo_yellow.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // 로그인
  const onLogin = async (e) => {
    if (!email) {
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }

    Login(email, password, setErrorMsg);
  };

  // 비밀번호에서 엔터 키 눌렀을 때 login 시켜버리기
  const enterKey = async (e) => {
    if (e.key === "Enter") {
      onLogin();
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
      }}
    >
      <NavLink to="/">
        <img
          src={yellow_logo}
          alt="corns-logo"
          css={css`
            height: 3rem;
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
        <input
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={onChangeEmail}
          css={css`
            width: 95%;
            height: 45px;
            border: 3px solid #111;
            padding-left: 16px;
            box-sizing: border-box;
          `}
        />
      </Box>

      <Box sx={{ width: "80%" }}>
        <h5
          css={css`
            font-size: 20px;
          `}
        >
          비밀번호
        </h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={onChangePassword}
            onKeyUp={enterKey}
            css={css`
              width: 95%;
              height: 45px;
              border: 3px solid #111;
              padding-left: 16px;
              box-sizing: border-box;
            `}
          />
        </form>

        <p
          css={css`
            color: #ff0000;
            font-size: 12px;
          `}
        >
          {errorMsg}
        </p>
      </Box>

      <Button
        sx={{
          backgroundColor: "#3C90F2",
          color: "#111111",
          margin: "64px 0 48px 0",
          width: "214px",
          height: "60px",
          border: "3px solid #111",
          boxSizing: "border-box",
          borderRadius: "0",
          fontWeight: "bold",
          fontSize: "20px",
          "&:hover": {
            backgroundColor: "#1766C3",
          },
        }}
        onClick={onLogin}
      >
        로그인
      </Button>

      <SocialLogin />
    </Box>
  );
}

export default LoginCard;
