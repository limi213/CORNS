import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function ChangePassword() {
  return (
    <>
      <h2>비밀번호 수정</h2>

      <Box sx={{ fontSize: "20px" }}>
        <Box>
          <h5>현재 비밀번호</h5>
          <input type="text" />
        </Box>
        
        <Box>
          <h5>비밀번호 재확인</h5>
          <input type="text" />
        </Box>

        <Box>
          <h5>새 비밀번호</h5>
          <input type="text" />
          <Button
              sx={{
                border: "3px solid #111",
                color: "#111111",
                backgroundColor: "#FFC804",
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
