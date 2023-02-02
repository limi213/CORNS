import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
    try {
      const res = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!res.ok) throw new Error("Request fail");
      else console.log(res.json());
    } catch (err) {
      console.log(err);
      setErrorMsg("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID,
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("socialLogin"),
      { theme: "outline", size: "large" }
    );
  }, []);

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
        <input
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={onChangePassword}
          css={css`
            width: 95%;
            height: 45px;
          `}
        />
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

      <Box sx={{ width: "80%" }}>
        <h3>소셜로그인</h3>
        <div id="socialLogin"></div>
      </Box>
    </Box>
  );
}

export default LoginCard;
