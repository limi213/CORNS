import React from "react";

import { Box, Button, Input } from "@mui/material";

function ChangePassword() {
  return (
    <>
      <h2>비밀번호 수정</h2>

      <Box sx={{ fontSize: "20px" }}>
        <Box>
          <h5>현재 비밀번호</h5>
          <Input
            type="password"
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
          <h5>새 비밀번호</h5>
          <Input
            type="password"
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
          <h5>비밀번호 재확인</h5>
          <Input
            type="password"
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
      </Box>
    </>
  );
}

export default ChangePassword;
