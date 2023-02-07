import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import Login from 'auth/Login';

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
    e.preventDefault();

    if (!email) {
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }

    Login(email, password, setErrorMsg)
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
        <input
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={onChangeEmail}
          css={css`
            width: 95%;
            height: 45px;
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
        <form>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={onChangePassword}
            css={css`
              width: 95%;
              height: 45px;
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
          margin: "64px 0",
          width: "214px",
          height: "60px",
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
