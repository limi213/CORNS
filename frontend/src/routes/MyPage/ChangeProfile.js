import React from "react";

import { Box, Button, Input } from "@mui/material";

function ChangeProfile() {
  return (
    <>
      <h2>회원 수정</h2>

      <Box sx={{ fontSize: "20px" }}>
        <Box>
          <h5>아이디</h5>
          <Input
            disabled
            placeholder="회원 아이디"
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "50%",
              height: "45px",
            }}
          />
        </Box>

        <Box>
          <h5>닉네임</h5>
          <Input
            placeholder="5"
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "40%",
              height: "45px",
            }}
          />
          <Button
            sx={{
              border: "3px solid #111",
              color: "#111111",
              backgroundColor: "#FFC804",
              width: "9%",
            }}
          >
            수정
          </Button>
        </Box>

        <Box>
          <h5>이메일</h5>
          <Input
            disabled
            placeholder="회원 이메일"
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "50%",
              height: "45px",
            }}
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
            <p>이미지를 끌어서 업로드하세요.</p>
            <Button
              sx={{
                border: "3px solid #111",
                color: "#111111",
                backgroundColor: "#FFC804",
              }}
            >
              파일 찾아서 올리기
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChangeProfile;
