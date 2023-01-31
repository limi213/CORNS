import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { XSquare } from "react-bootstrap-icons";

function RequestForm() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "25%",
    bgcolor: "background.paper",
    border: "3px solid #111",
    boxShadow: 24,
    p: "32px 0 200px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const [text, setText] = useState("우리 친구해요!");

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Box sx={style}>
      <Box sx={{display: 'flex', width: "100%", justifyContent: 'flex-end', mr: "10%", mb: "5%"}}>
        <XSquare />
      </Box>

      <TextField
        // variant="outlined"
        multiline
        rows={8}
        sx={{
          width: "70%",
          backgroundColor: "white",
          border: "3px solid #111",
          mt: "16px",
        }}
        value={text}
        onChange={onChange}
      />

      <Button
        sx={{
          backgroundColor: "#FFC804",
          color: "#111111",
          margin: "32px 0",
          width: "30%",
          height: "30%",
        }}
      >
        친구신청 보내기
      </Button>
    </Box>
  );
}

export default RequestForm;
