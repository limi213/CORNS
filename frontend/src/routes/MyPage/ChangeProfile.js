import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import { Box, Button } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


// 회원정보 수정 axios
const changeProfileAxios = async (formData) => {
  for (let value of formData.values()) {
    console.log(value);
  }

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}/user`,
      {
        data: formData,
      }
    );
    if (response.status === 200) {
      console.log(response.data)
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("imgUrl", response.data.imgUrl);
      alert('회원정보가 수정되었습니다.')
      return true;
    }
  } catch (e) {
    console.log(e);
  }
}


function ChangeProfile() {
  const [nickname, setNickname] = useState("");
  const [stateNickname, setStateNickname] = useState(true);
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const fileInput = useRef("");

  const formData = new FormData();

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    // 닉네임 유효성 검사
    const validateNickname = (nickname) => {
      return nickname.match(/^[a-zA-Z]*$/) && nickname.length > 0 && nickname.length < 21;
    };
    setStateNickname(Boolean(nickname && validateNickname(nickname)));
  }, [nickname]);


  const handleClick = (e) => {
    fileInput.current.click();
  };

  const onUploadImg = (e) => {
    const file = e.target.files[0];
    setImgFile(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
  };

  const submitHandler = async () => {
    if (!nickname && !imgSrc) {
      return;
    }
    if (nickname && !stateNickname) {
      return;
    }
    console.log("submit!");
    console.log(nickname, imgFile)

    
    formData.append("userId", sessionStorage.getItem("userId"));
    formData.append("nickname", nickname);
    formData.append("multipartFile", imgFile)

    const res = await changeProfileAxios(formData)
    if (res) {
      window.location.reload();
    }
  };

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
              padding-left: 10px;
            `}
          />
          <p
            css={css`
              font-size: 14px;
              margin: 10px;
              color: ${
                (nickname && !stateNickname) ? "red" : "black"
              };
              }
            `}
          >
            닉네임은 실제로 불릴 이름이며, 1-20글자 사이의 영문으로
            표기해야합니다.
          </p>
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
            {imgSrc && (
              <img
                src={imgSrc}
                css={css`
                  width: 120px;
                  height: 120px;
                  border-radius: 200px;
                  border: 2px solid #111;
                  margin-bottom: 20px;
                  object-fit: cover;
                `}
              />
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
          onClick={submitHandler}
        >
          적용
        </Button>
      </Box>
    </>
  );
}

export default ChangeProfile;
