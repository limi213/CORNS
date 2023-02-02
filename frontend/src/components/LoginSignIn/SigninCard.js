import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

import SigninEmail from "./SigninEmail";
import SigninPassword from "./SigninPassword";
import SigninNickname from "./SigninNickname";

import { Box, Button } from "@mui/material";
import yellow_logo from "assets/corns_logo_yellow.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SigninCard({ checked }) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");

  const [stateEmail, setStateEmail] = useState(false);
  const [statePassword1, setStatePassword1] = useState(false);
  const [statePassword2, setStatePassword2] = useState(false);
  const [stateNickname, setStateNickname] = useState(false);

  // 회원가입
  // CORS 에러 -> 해결해야함
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!stateEmail || !statePassword1 || !statePassword2 || !stateNickname) {
      console.log(stateEmail, statePassword1, statePassword2, stateNickname);
      alert("항목을 확인해주세요.");
      return;
    }
    if (!checked) {
      alert("약관에 동의해주세요.");
      return;
    }
    try {
      console.log("Sign in!");
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/user/join`,
        {
          email: email,
          password: password1,
          nickname: nickname,
        }
      );
      console.log(response);
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
            height: 2rem;
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
