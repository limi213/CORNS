import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Box, Button } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SigninNickname({
  nickname,
  setNickname,
  stateNickname,
  setStateNickname,
}) {
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    // 닉네임 유효성 검사
    // 지금 숫자 들어감 -> 수정해야함
    const validateNickname = (nickname) => {
      return nickname.toLowerCase().match(/^[a-z|A-Z|].{1,20}$/);
    };

    setStateNickname(Boolean(nickname && validateNickname(nickname)));
  }, [nickname]);

  return (
    <Box sx={{ width: "90%" }}>
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
          border: 3px solid #111;
          border-radius: 0;
          padding-left: 16px;
          box-sizing: border-box;
        `}
      />

      <p
        css={css`
          font-size: 12px;
          color: ${!nickname || stateNickname ? "#FFFFFF" : "#FF0000"};
        `}
      >
        닉네임은 실제로 불릴 이름이며, 1-20글자 사이의 영문으로 표기해야합니다.
      </p>
    </Box>
  );
}

export default SigninNickname;
