import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import Login from "auth/Login";

import SigninEmail from "./SigninEmail";
import SigninPassword from "./SigninPassword";
import SigninNickname from "./SigninNickname";

import { Box, Button } from "@mui/material";
import yellow_logo from "assets/corns_logo_yellow.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SigninCard({ checked1, checked2 }) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");

  const [stateEmail, setStateEmail] = useState(false);
  const [statePassword1, setStatePassword1] = useState(false);
  const [statePassword2, setStatePassword2] = useState(false);
  const [stateNickname, setStateNickname] = useState(false);

  // 회원가입
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!stateEmail || !statePassword1 || !statePassword2 || !stateNickname) {
      alert("항목을 확인해주세요.");
      return;
    }
    if (!checked1 || !checked2) {
      alert("약관에 동의해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/join`,
        {
          email: email,
          password: password1,
          nickname: nickname,
        }
      );
      if (response.status === 200) {
        // 홈페이지 이동
        window.location.href = "/";
        alert("회원가입이 완료되었습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        padding: "32px 32px",
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
            height: 3rem;
          `}
        />
      </NavLink>

      <SigninEmail
        email={email}
        setEmail={setEmail}
        stateEmail={stateEmail}
        setStateEmail={setStateEmail}
      />

      <SigninPassword
        password1={password1}
        setPassword1={setPassword1}
        password2={password2}
        setPassword2={setPassword2}
        statePassword1={statePassword1}
        setStatePassword1={setStatePassword1}
        statePassword2={statePassword2}
        setStatePassword2={setStatePassword2}
      />

      <SigninNickname
        nickname={nickname}
        setNickname={setNickname}
        stateNickname={stateNickname}
        setStateNickname={setStateNickname}
      />

      <Button
        sx={{
          color: "#111",
          mt: "32px",
          width: "240px",
          height: "60px",
          backgroundColor: "#FFC804",
          fontSize: "16px",
          fontWeight: "bold",
          border: "3px solid #111",
          borderRadius: "0",
          "&:hover": {
            backgroundColor: "#FFB800",
          },
        }}
        onClick={onSubmit}
      >
        회원가입
      </Button>
    </Box>
  );
}

export default SigninCard;
