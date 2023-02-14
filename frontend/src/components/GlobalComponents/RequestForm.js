import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "auth/useAxios";
import { Box, TextField, Button } from "@mui/material";
import { XSquare } from "react-bootstrap-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function RequestForm({ fromId, toId, handleCloseForm, setRelation }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "20%",
    bgcolor: "background.paper",
    border: "3px solid #111",
    boxShadow: 24,
    p: "32px 0 200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const [text, setText] = useState("우리 친구해요!");
  const { status, isLoading, sendRequest } = useAxios();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const sendFriend = (fromId, toId, message, setRelation, handleCloseForm) => {
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/friend/send`,
      method: "POST",
      data: {
        fromId: fromId,
        toId: toId,
        message: message,
      },
    });
  };

  useEffect(() => {
    if (status === 200) {
      setRelation(1);
      handleCloseForm();
    }
  }, [status]);

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mr: "10%",
          mb: "5%",
        }}
      >
        <XSquare
          css={css`
            margin-left: 75%;
            font-size: 30px;
            cursor: pointer;
          `}
          onClick={handleCloseForm}
        />
      </Box>

      <TextField
        multiline
        rows={7}
        sx={{
          width: "70%",
          backgroundColor: "white",
          border: "3px solid #111",
        }}
        value={text}
        inputProps={{ maxLength: 100, sx: { fontFamily: "Noto Sans KR", fontSize: "18px" } }}
        onChange={onChange}
      />

      <Button
        sx={{
          backgroundColor: "#FFC804",
          color: "black",
          border: "2px solid #111",
          m: "30px 0",
          width: "30%",
          height: "30%",
          borderRadius: "0",
          fontWeight: "bold",
          fontSize: "16px",
          fontFamily: "Noto Sans KR",
          "&:hover": {
            backgroundColor: "#FFD704",
          },
        }}
        onClick={() =>
          sendFriend(fromId, toId, text, setRelation, handleCloseForm)
        }
      >
        친구신청 보내기
      </Button>
    </Box>
  );
}

export default RequestForm;
