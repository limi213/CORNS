import React, { useState, useRef } from "react";
import axios from "axios";

import { Box, Button } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ChangeProfile() {
  const [nickname, setNickname] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const fileInput = useRef("");

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClick = (e) => {
    fileInput.current.click();
  };

  const onUploadImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    console.log(imgSrc)
  };

  const onSubmit = async (e) => {};

  return (
    <>
      <h2>회원 수정</h2>

      <Box sx={{ fontSize: "18px" }}>
        <Box>
          <h5>아이디</h5>
          <p>{sessionStorage.getItem("userId")}</p>
        </Box>

        <Box>
          <h5>이메일</h5>
          <p>{sessionStorage.getItem("email")}</p>
        </Box>

        <Box>
          <h5>닉네임</h5>
          <input
            placeholder={sessionStorage.getItem("nickname")}
            value={nickname}
            onChange={onChangeNickname}
            css={css`
              border: 3px solid #111;
              width: 50%;
              height: 45px;
              font-size: 19px;
            `}
          />
        </Box>

        <Box>
          <h5>프로필 이미지</h5>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "3px solid #111",
              width: "50%",
              height: "240px",
            }}
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                css={css`
                  width: 100px;
                  height: 100px;
                  border-radius: 200px;
                  border: 2px solid #111;
                `}
              />
            ) : (
              <p>이미지를 끌어서 업로드하세요.</p>
            )}

            <Button
              sx={{
                border: "3px solid #111",
                color: "#111111",
                backgroundColor: "#FFC804",
              }}
              onClick={handleClick}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                css={css`
                  display: none;
                `}
                onChange={onUploadImg}
              />
              파일 찾아서 올리기
            </Button>
          </Box>
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

export default ChangeProfile;
